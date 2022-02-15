import React from "react";
import { Team, TeamMember } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

import ModalContainer from "../ui/ModalContainer";
import { DangerButton } from "../ui/buttons/DangerButton";
import { CustomButton } from "../ui/Button";
import { deleteTeamMemberRequest } from "@/services/api/teamMembersApi";
import { RQ_KEY_FEEDBACKS_ALL, RQ_KEY_USER } from "@/constants/constants";
import { ErrorText } from "../ui/typography/ErrorText";
import { HOME } from "@/constants/routerConstants";

type TeamMemberDeleteModalProps = {
  open: boolean;
  handleClose: () => void;
  teamMember: TeamMember & { team?: Team };
};

export const TeamMemberDeleteModal = ({
  open,
  handleClose,
  teamMember,
}: TeamMemberDeleteModalProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation(deleteTeamMemberRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
  });

  const handleDeleteTeamMember = async () => {
    deleteMutation.mutate({ teamMemberId: teamMember.id });
  };

  const handleCloseSuccessModal = () => {
    handleClose();
    router.push(HOME);
  };

  return (
    <ModalContainer handleClose={handleClose} open={open}>
      {deleteMutation.isSuccess ? (
        <>
          <Typography component="h2" variant="h4">
            User deleted successfully!
          </Typography>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <Button onClick={handleCloseSuccessModal}>Close</Button>
          </div>
        </>
      ) : (
        <>
          <Typography component="h2" variant="h4">
            Are you sure you want to delete this team member?
          </Typography>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <DangerButton
              btnText="Delete Team Member"
              onClick={handleDeleteTeamMember}
              disabled={deleteMutation.isLoading}
            />
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={deleteMutation.isLoading}
            >
              Cancel
            </Button>
          </div>
          {deleteMutation.error && (
            <ErrorText>
              Something went wrong: {deleteMutation.error.message}
            </ErrorText>
          )}
        </>
      )}
    </ModalContainer>
  );
};
