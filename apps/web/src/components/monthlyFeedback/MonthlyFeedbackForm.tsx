import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Box, Button, Typography } from "@mui/material";
import { MonthlyFeedback, TeamMember } from "@prisma/client";

import {
  createMonthlyFeedbackRequest,
  updateMonthlyFeedbackRequest,
} from "@/services/api/monthlyFeedbackApi";
import { Months } from "@/types/types";
import { RQ_KEY_TEAM_MEMBER } from "@/constants/constants";
import { ErrorText } from "../ui/typography/ErrorText";
import { ControlledTextField } from "../ui/forms/ControlledTextField";

type MonthlyFeedbackFormProps = {
  monthlyFeedback: MonthlyFeedback | string;
  handleClose: () => void;
  teamMemberId: TeamMember["id"];
};

export const MonthlyFeedbackForm = ({
  monthlyFeedback,
  handleClose,
  teamMemberId,
}: MonthlyFeedbackFormProps) => {
  const queryClient = useQueryClient();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      positiveFeedback:
        typeof monthlyFeedback !== "string"
          ? monthlyFeedback?.positiveFeedback
          : "",
      negativeFeedback:
        typeof monthlyFeedback !== "string"
          ? monthlyFeedback?.negativeFeedback
          : "",
    },
  });

  const createMutation = useMutation(createMonthlyFeedbackRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      handleClose();
      queryClient.refetchQueries(RQ_KEY_TEAM_MEMBER);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(RQ_KEY_TEAM_MEMBER);
    },
  });

  const updateMutation = useMutation(updateMonthlyFeedbackRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      handleClose();
      queryClient.refetchQueries([RQ_KEY_TEAM_MEMBER]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(RQ_KEY_TEAM_MEMBER);
    },
  });

  type FormData = {
    positiveFeedback: string;
    negativeFeedback: string;
  };

  const onSubmit = (formData: FormData) => {
    if (typeof monthlyFeedback === "string") {
      const fullYear = new Date().getFullYear();

      createMutation.mutate({
        createdAt: new Date(
          `${Months[monthlyFeedback]} 01 ${fullYear} 00:01:00`
        ),
        teamMemberId,
        positiveFeedback: formData.positiveFeedback,
        negativeFeedback: formData.negativeFeedback,
      });
    } else {
      updateMutation.mutate({
        id: monthlyFeedback.id,
        positiveFeedback: formData.positiveFeedback,
        negativeFeedback: formData.negativeFeedback,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-[600px] max-w-md my-8"
    >
      <Typography component="h2" variant="h4">
        {
          Months[
            typeof monthlyFeedback === "string"
              ? monthlyFeedback
              : new Date(monthlyFeedback.createdAt).getMonth()
          ]
        }
      </Typography>

      <ControlledTextField
        name="positiveFeedback"
        label="Positive Feedback"
        control={control}
        placeholder="What did they do really well this month..."
        rows={10}
      />
      <ControlledTextField
        name="negativeFeedback"
        label="Negative Feedback"
        control={control}
        placeholder="Where is there room for improvement..."
        rows={10}
      />

      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={updateMutation.isLoading}
        >
          Update Feedback
        </Button>
        <Button color="secondary" variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
      {updateMutation.isError && (
        <ErrorText>
          Something went wrong. {updateMutation.error.message}
        </ErrorText>
      )}
    </form>
  );
};
