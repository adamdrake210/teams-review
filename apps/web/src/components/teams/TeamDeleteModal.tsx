import React from "react";
import { Team } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { Button, Typography } from "@mui/material";

import ModalContainer from "../ui/ModalContainer";
import { DangerButton } from "../ui/buttons/DangerButton";
import { RQ_KEY_TEAMS, RQ_KEY_USER } from "@/constants/constants";
import { ErrorText } from "../ui/typography/ErrorText";
import { deleteTeamsRequest } from "@/services/api/teamsApi";

type TeamMemberDeleteModalProps = {
  open: boolean;
  handleClose: () => void;
  team: Team;
};

export const TeamDeleteModal = ({
  open,
  handleClose,
  team,
}: TeamMemberDeleteModalProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteTeamsRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries([RQ_KEY_USER, RQ_KEY_TEAMS]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER, RQ_KEY_TEAMS]);
    },
  });

  const handleDeleteTeam = async () => {
    deleteMutation.mutate({ teamId: team.id });
  };

  const handleCloseSuccessModal = () => {
    handleClose();
  };

  return (
    <ModalContainer handleClose={handleClose} open={open}>
      {deleteMutation.isSuccess ? (
        <>
          <Typography component="h2" variant="h4">
            Team deleted successfully!
          </Typography>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <Button variant="contained" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </div>
        </>
      ) : (
        <>
          <Typography component="h2" variant="h4">
            Are you sure you want to delete this team?
          </Typography>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <DangerButton
              btnText="Delete Team"
              onClick={handleDeleteTeam}
              disabled={deleteMutation.isLoading}
            />
            <Button onClick={handleClose} disabled={deleteMutation.isLoading}>
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
