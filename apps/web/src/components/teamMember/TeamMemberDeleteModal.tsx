import React from "react";
import { Team, TeamMember } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import ModalContainer from "../ui/ModalContainer";
import { Heading2 } from "../ui/typography/Heading2";
import { DangerButton } from "../ui/buttons/DangerButton";
import { Button } from "../ui/Button";
import { deleteTeamMemberRequest } from "@/services/api/teamMembersApi";
import { RQ_KEY_FEEDBACKS_ALL, RQ_KEY_USER } from "@/constants/constants";
import { ErrorText } from "../ui/typography/ErrorText";

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
    router.reload();
    handleClose();
  };

  return (
    <ModalContainer handleClose={handleClose} open={open}>
      {deleteMutation.isSuccess ? (
        <>
          <Heading2>User deleted successfully!</Heading2>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <Button
              type="button"
              color="primary"
              onClick={handleCloseSuccessModal}
              btnText="Close"
              className="ml-2"
            />
          </div>
        </>
      ) : (
        <>
          <Heading2>Are you sure you want to delete this team member?</Heading2>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <DangerButton
              btnText="Delete Team Member"
              onClick={handleDeleteTeamMember}
              disabled={deleteMutation.isLoading}
            />
            <Button
              type="button"
              onClick={handleClose}
              btnText="Cancel"
              className="ml-2"
              disabled={deleteMutation.isLoading}
            />
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
