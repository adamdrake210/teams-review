import React from "react";
import { Team } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/dist/client/router";

import { RQ_KEY_USER } from "@/constants/constants";
import { ControlledTextField } from "@/components/ui/fields/ControlledTextField";
import { TEAMS } from "@/constants/routerConstants";
import { ErrorText } from "@/components/ui/typography/ErrorText";
import {
  IS_ONLY_ALPHABET_CHARACTERS,
  MAX_FIELD_LENGTH,
} from "@/utils/formHelpers";
import {
  createTeamsRequest,
  updateTeamsRequest,
} from "@/services/api/teamsApi";
import { Button, FormControl } from "@mui/material";

type TeamsFormProps = {
  editTeams?: Team;
};

type TeamFormValues = {
  title: Team["title"];
  description: Team["description"];
};

export const TeamsForm = ({ editTeams }: TeamsFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit, control } = useForm<TeamFormValues>({
    defaultValues: {
      title: editTeams?.title || "",
      description: editTeams?.description || "",
    },
  });

  const createMutation = useMutation(createTeamsRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      router.push(TEAMS);
      queryClient.refetchQueries([RQ_KEY_USER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const updateMutation = useMutation(updateTeamsRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      router.push(TEAMS);
      queryClient.refetchQueries([RQ_KEY_USER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const onSubmit = (formData: TeamFormValues) => {
    if (editTeams) {
      updateMutation.mutate({ id: editTeams.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <FormControl
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        my: 2,
        width: { xs: "100%", md: "30%" },
      }}
    >
      <ControlledTextField
        name="title"
        label="Team Title"
        control={control}
        rules={{
          required: "Team Title is required",
          maxLength: MAX_FIELD_LENGTH,
          pattern: IS_ONLY_ALPHABET_CHARACTERS,
        }}
      />
      <ControlledTextField
        name="description"
        label="Team Description"
        control={control}
        rules={{
          required: "Team Description is required",
          maxLength: 256,
          pattern: IS_ONLY_ALPHABET_CHARACTERS,
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={updateMutation.isLoading || createMutation.isLoading}
      >
        {editTeams ? "Update" : "Submit"}
      </Button>
      {createMutation.isError ||
        (updateMutation.isError && (
          <ErrorText>
            Something went wrong. {createMutation.error.message}
          </ErrorText>
        ))}
    </FormControl>
  );
};
