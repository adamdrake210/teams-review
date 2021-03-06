import React from "react";
import { Team } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { Box, Button, Typography } from "@mui/material";

import ModalContainer from "../ui/ModalContainer";
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

  const handleDeleteTeam = () => {
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
            <Button variant="contained" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography component="h2" variant="h5">
            Are you sure you want to delete this team?
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
              variant="contained"
              color="error"
              onClick={handleDeleteTeam}
              disabled={deleteMutation.isLoading}
              sx={{ mr: 2 }}
            >
              Delete Team
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
