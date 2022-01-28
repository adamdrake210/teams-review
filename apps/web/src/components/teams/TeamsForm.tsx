import React from "react";
import { Team } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/dist/client/router";

import { RQ_KEY_USER } from "@/constants/constants";
import { updateTeamMemberRequest } from "@/services/api/teamMembersApi";
import { Button } from "@/components/ui/Button";
import { ControlledTextField } from "@/components/ui/forms/ControlledTextField";
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md my-8">
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
        btnText={`${editTeams ? "Update" : "Submit"}`}
        color="primary"
        disabled={updateMutation.isLoading || createMutation.isLoading}
      />
      {createMutation.isError ||
        (updateMutation.isError && (
          <ErrorText>
            Something went wrong. {createMutation.error.message}
          </ErrorText>
        ))}
    </form>
  );
};
