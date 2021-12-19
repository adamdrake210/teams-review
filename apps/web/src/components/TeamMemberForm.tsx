import { TeamMember } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createTeamMembersRequest } from "../services/api/teamMembersApi";
import { Button } from "./ui/Button";
import { TextField } from "./ui/TextField";

const initialFormValues = {
  firstName: "",
  lastName: "",
  position: "",
  joined: new Date(),
};

export const TeamMemberForm = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm<TeamMember>({
    defaultValues: initialFormValues,
  });

  const createMutation = useMutation(createTeamMembersRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["something"]);
      reset(initialFormValues);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["something"]);
    },
  });

  const onSubmit = (formData: TeamMember) => {
    console.log("formData: ", formData);
    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md my-8">
      <TextField
        name="firstName"
        label="First Name"
        control={control}
        rules={{ required: "First Name is required" }}
      />
      <TextField
        name="lastName"
        label="Last Name"
        control={control}
        rules={{ required: "Last Name is required" }}
      />
      <TextField
        name="email"
        label="Email"
        control={control}
        rules={{ required: "Email is required" }}
      />
      <TextField
        name="position"
        label="Current Position"
        control={control}
        rules={{ required: "Current Position is required" }}
      />

      <Button type="submit" btnText="Submit" color="primary" />
    </form>
  );
};
