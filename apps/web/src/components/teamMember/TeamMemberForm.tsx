import { Team, TeamMember } from "@prisma/client";
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
import { TEAM_MEMBER } from "@/constants/routerConstants";
import { ErrorText } from "../ui/typography/ErrorText";

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
  } = useQuery(RQ_KEY_USER, getUser);

  const createMutation = useMutation(createTeamMemberRequest, {
    onError: (err: Error) => {
      console.error(err.message);
      setApiError(err);
    },
    onSuccess: (data) => {
      router.push(`${TEAM_MEMBER}${data.id}`);
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
      router.push(`${TEAM_MEMBER}${data.id}`);
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
        rules={{ required: "First Name is required" }}
      />
      <ControlledTextField
        name="lastName"
        label="Last Name"
        control={control}
        rules={{ required: "Last Name is required" }}
      />
      <ControlledTextField
        name="email"
        label="Email"
        control={control}
        rules={{ required: "Email is required" }}
      />
      <ControlledTextField
        name="position"
        label="Current Position"
        control={control}
        rules={{ required: "Current Position is required" }}
      />
      <Loading isLoading={isLoading} error={error} isError={isError}>
        {userData && (
          <SelectField
            name="teamId"
            label="Select Team"
            control={control}
            data={userData.teams}
          />
        )}
      </Loading>

      <Button
        type="submit"
        btnText={`${editTeamMember ? "Update" : "Submit"}`}
        color="primary"
        disabled={updateMutation.isLoading || createMutation.isLoading}
      />
      {apiError && (
        <ErrorText>Something went wrong. {apiError.message}</ErrorText>
      )}
    </form>
  );
};
