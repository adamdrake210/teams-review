import React from "react";
import { Team } from "@prisma/client";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import ModalContainer from "../ui/ModalContainer";
import { Heading2 } from "../ui/typography/Heading2";
import { DangerButton } from "../ui/buttons/DangerButton";
import { Button } from "../ui/Button";
import { RQ_KEY_TEAMS, RQ_KEY_USER } from "@/constants/constants";
import { ErrorText } from "../ui/typography/ErrorText";
import { TEAMS } from "@/constants/routerConstants";
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
  const router = useRouter();

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
    router.push(TEAMS);
  };

  return (
    <ModalContainer handleClose={handleClose} open={open}>
      {deleteMutation.isSuccess ? (
        <>
          <Heading2>Team deleted successfully!</Heading2>
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
          <Heading2>Are you sure you want to delete this team?</Heading2>
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <DangerButton
              btnText="Delete Team"
              onClick={handleDeleteTeam}
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
