import { Team, TeamMember, User } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/dist/client/router";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import {
  createTeamMemberRequest,
  updateTeamMemberRequest,
} from "@/services/api/teamMembersApi";
import { SelectField } from "@/components/ui/forms/SelectField";
import { Button } from "@/components/ui/Button";
import { ControlledTextField } from "@/components/ui/forms/ControlledTextField";
import { Loading } from "@/components/Loading";
import { TEAM_MEMBERS } from "@/constants/routerConstants";
import { ErrorText } from "@/components/ui/typography/ErrorText";
import {
  IS_EMAIL_PATTERN,
  IS_ONLY_ALPHABET_CHARACTERS,
  MAX_FIELD_LENGTH,
} from "@/utils/formHelpers";

type TeamMemberFormProps = {
  editTeamMember?: TeamMember & { team: Team };
};

export const TeamMemberForm = ({ editTeamMember }: TeamMemberFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [apiError, setApiError] = useState<Error | null>(null);

  const { handleSubmit, control } = useForm<TeamMember>({
    defaultValues: {
      firstName: editTeamMember?.firstName || "",
      lastName: editTeamMember?.lastName || "",
      position: editTeamMember?.position || "",
      email: editTeamMember?.email || "",
      joined: editTeamMember?.joined || new Date(),
      teamId: editTeamMember?.teamId || "",
    },
  });

  const {
    data: userData,
    isLoading,
    error,
    isError,
  } = useQuery<User & { teams: Team[] }, Error>(RQ_KEY_USER, getUser);

  const createMutation = useMutation(createTeamMemberRequest, {
    onError: (err: Error) => {
      console.error(err.message);
      setApiError(err);
    },
    onSuccess: (data) => {
      router.push(`${TEAM_MEMBERS}${data.id}`);
      queryClient.refetchQueries([RQ_KEY_USER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const updateMutation = useMutation(updateTeamMemberRequest, {
    onError: (err: Error) => {
      console.error(err.message);
      setApiError(err);
    },
    onSuccess: (data) => {
      router.push(`${TEAM_MEMBERS}${data.id}`);
      queryClient.refetchQueries([RQ_KEY_USER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const onSubmit = (formData: TeamMember) => {
    setApiError(null);
    if (editTeamMember) {
      updateMutation.mutate({ id: editTeamMember.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md my-8">
      <ControlledTextField
        name="firstName"
        label="First Name"
        control={control}
        rules={{
          required: "First Name is required",
          maxLength: MAX_FIELD_LENGTH,
          pattern: IS_ONLY_ALPHABET_CHARACTERS,
        }}
      />
      <ControlledTextField
        name="lastName"
        label="Last Name"
        control={control}
        rules={{
          required: "Last Name is required",
          maxLength: MAX_FIELD_LENGTH,
          pattern: IS_ONLY_ALPHABET_CHARACTERS,
        }}
      />
      <ControlledTextField
        name="email"
        label="Email"
        control={control}
        rules={{
          required: "Email is required",
          maxLength: MAX_FIELD_LENGTH,
          pattern: IS_EMAIL_PATTERN,
        }}
      />
      <ControlledTextField
        name="position"
        label="Current Position"
        control={control}
        rules={{
          required: "Current Position is required",
          maxLength: MAX_FIELD_LENGTH,
        }}
      />
      <Loading isLoading={isLoading} error={error} isError={isError}>
        {userData && userData.teams.length > 0 ? (
          <SelectField
            name="teamId"
            label="Select Team"
            control={control}
            data={userData.teams}
          />
        ) : (
          <ErrorText>
            You need to create a team first before creating any team members.
          </ErrorText>
        )}
      </Loading>

      <Button
        type="submit"
        btnText={`${editTeamMember ? "Update" : "Submit"}`}
        color="primary"
        disabled={
          updateMutation.isLoading ||
          createMutation.isLoading ||
          !(userData && userData.teams.length > 0)
        }
      />
      {apiError && (
        <ErrorText>Something went wrong. {apiError.message}</ErrorText>
      )}
    </form>
  );
};
