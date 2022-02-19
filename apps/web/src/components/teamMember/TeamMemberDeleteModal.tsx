import React from "react";
import { Team, TeamMember } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";

import ModalContainer from "../ui/ModalContainer";
import { DangerButton } from "../ui/buttons/DangerButton";
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

  const handleDeleteTeamMember = () => {
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mx: "auto",
              my: 2,
            }}
          >
            <Button onClick={handleCloseSuccessModal}>Close</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography component="h2" variant="h4">
            Are you sure you want to delete this team member?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mx: "auto",
              my: 2,
            }}
          >
            <Button
              color="error"
              variant="contained"
              onClick={handleDeleteTeamMember}
              disabled={deleteMutation.isLoading}
              sx={{ mr: 2 }}
            >
              Delete Team Member
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              disabled={deleteMutation.isLoading}
            >
              Cancel
            </Button>
          </Box>
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
