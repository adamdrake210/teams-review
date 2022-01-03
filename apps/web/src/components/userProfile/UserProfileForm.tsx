import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";

import { updateUserRequest } from "@/services/api/userApi";
import { RQ_KEY_USER } from "@/constants/constants";
import { ControlledTextField } from "../ui/forms/ControlledTextField";
import { Button } from "../ui/Button";
import { ErrorText } from "../ui/typography/ErrorText";
import { SuccessText } from "../ui/typography/SuccessText";

type UserProfileFormProps = {
  userData: User;
};

export const UserProfileForm = ({ userData }: UserProfileFormProps) => {
  const queryClient = useQueryClient();
  const [apiError, setApiError] = useState<Error | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
    },
  });

  const updateMutation = useMutation(updateUserRequest, {
    onError: (err: Error) => {
      console.error(err.message);
      setApiError(err);
    },
    onSuccess: () => {
      setSuccessMessage(true);
      queryClient.refetchQueries([RQ_KEY_USER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER]);
    },
  });

  const onSubmit = (formData: User) => {
    setApiError(null);
    updateMutation.mutate({ id: userData.id, ...formData });
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

      {successMessage && (
        <SuccessText
          message="The updates were saved successfully"
          handleShowingMessage={setSuccessMessage}
        />
      )}
      <Button
        type="submit"
        btnText="Update Profile"
        color="primary"
        disabled={updateMutation.isLoading}
      />
      {apiError && (
        <ErrorText>Something went wrong. {apiError.message}</ErrorText>
      )}
    </form>
  );
};
