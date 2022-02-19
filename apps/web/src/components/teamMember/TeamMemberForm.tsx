import { Team, TeamMember, User } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/dist/client/router";

import { RQ_KEY_TEAM_MEMBER, RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import {
  createTeamMemberRequest,
  updateTeamMemberRequest,
} from "@/services/api/teamMembersApi";
import { SelectField } from "@/components/ui/forms/SelectField";
import { ControlledTextField } from "@/components/ui/forms/ControlledTextField";
import { Loading } from "@/components/Loading";
import { TEAM_MEMBERS } from "@/constants/routerConstants";
import { ErrorText } from "@/components/ui/typography/ErrorText";
import {
  IS_EMAIL_PATTERN,
  IS_ONLY_ALPHABET_CHARACTERS,
  MAX_FIELD_LENGTH,
} from "@/utils/formHelpers";
import { DatePick } from "@/components/ui/forms/DatePick";
import { Button } from "@mui/material";

type TeamMemberFormProps = {
  editTeamMember?: TeamMember & { team: Team };
};

export const TeamMemberForm = ({ editTeamMember }: TeamMemberFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [apiError, setApiError] = useState<Error | null>(null);
  const [startDate, setStartDate] = useState(
    editTeamMember ? new Date(editTeamMember?.joined) : new Date()
  );

  console.log("editTeamMember: ", new Date(editTeamMember?.joined));

  const { handleSubmit, control } = useForm<TeamMember>({
    defaultValues: {
      firstName: editTeamMember?.firstName || "",
      lastName: editTeamMember?.lastName || "",
      position: editTeamMember?.position || "",
      email: editTeamMember?.email || "",
      joined: new Date(editTeamMember?.joined) || startDate,
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
      setApiError(err);
    },
    onSuccess: (data) => {
      router.push(`${TEAM_MEMBERS}${data.id}`);
      queryClient.refetchQueries([RQ_KEY_USER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER, RQ_KEY_TEAM_MEMBER]);
    },
  });

  const updateMutation = useMutation(updateTeamMemberRequest, {
    onError: (err: Error) => {
      setApiError(err);
    },
    onSuccess: (data) => {
      router.push(`${TEAM_MEMBERS}${data.id}`);
      queryClient.refetchQueries([RQ_KEY_USER, RQ_KEY_TEAM_MEMBER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const onSubmit = (formData: TeamMember) => {
    setApiError(null);

    console.log("formData: ", { ...formData, joined: startDate.toISOString() });
    if (editTeamMember) {
      updateMutation.mutate({
        id: editTeamMember.id,
        ...formData,
        joined: startDate,
      });
    } else {
      createMutation.mutate({ ...formData, joined: startDate });
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

      <DatePick startDate={startDate} setStartDate={setStartDate} />

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
        variant="contained"
        disabled={
          updateMutation.isLoading ||
          createMutation.isLoading ||
          !(userData && userData.teams.length > 0)
        }
      >
        {editTeamMember ? "Update" : "Submit"}
      </Button>
      {apiError && (
        <ErrorText>Something went wrong. {apiError.message}</ErrorText>
      )}
    </form>
  );
};
