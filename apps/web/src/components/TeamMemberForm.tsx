import { TeamMember } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { RQ_KEY_USER } from "../constants/constants";
import { getUser } from "../services/api/userApi";
import { createTeamMembersRequest } from "../services/api/teamMembersApi";
import { SelectField } from "./SelectField";
import { Button } from "./ui/Button";
import { ControlledTextField } from "./ui/forms/ControlledTextField";
import { Loading } from "./Loading";

const initialFormValues = {
  firstName: "",
  lastName: "",
  position: "",
  joined: new Date(),
  team: "",
};

export const TeamMemberForm = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm<TeamMember>({
    defaultValues: initialFormValues,
  });

  const {
    data: userData,
    isLoading,
    error,
    isError,
  } = useQuery(RQ_KEY_USER, getUser);

  const createMutation = useMutation(createTeamMembersRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries([RQ_KEY_USER]);
      reset(initialFormValues);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const onSubmit = (formData: TeamMember) => {
    createMutation.mutate(formData);
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
            name="team"
            label="Select Team"
            control={control}
            data={userData.teams}
          />
        )}
      </Loading>

      <Button type="submit" btnText="Submit" color="primary" />
    </form>
  );
};
