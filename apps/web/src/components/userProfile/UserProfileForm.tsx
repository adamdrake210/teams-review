import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { Button, FormControl } from "@mui/material";

import { updateUserRequest } from "@/services/api/userApi";
import { RQ_KEY_USER } from "@/constants/constants";
import { ControlledTextField } from "@/components/ui/fields/ControlledTextField";
import { ErrorText } from "@/components/ui/typography/ErrorText";
import { SuccessText } from "@/components/ui/typography/SuccessText";

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
        variant="contained"
        disabled={updateMutation.isLoading}
      >
        Update Profile
      </Button>
      {apiError && (
        <ErrorText>Something went wrong. {apiError.message}</ErrorText>
      )}
    </FormControl>
  );
};
