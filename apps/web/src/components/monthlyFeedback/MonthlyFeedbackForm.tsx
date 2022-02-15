import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import {
  createMonthlyFeedbackRequest,
  updateMonthlyFeedbackRequest,
} from "@/services/api/monthlyFeedbackApi";
import { MonthlyFeedback, TeamMember } from "@prisma/client";
import { Months } from "@/types/types";
import { RQ_KEY_FEEDBACKS_ALL, RQ_KEY_USER } from "@/constants/constants";
import { ControlledTextArea } from "@/components/ui/forms/ControlledTextArea";
import { ErrorText } from "../ui/typography/ErrorText";
import { Button } from "@mui/material";

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
      queryClient.refetchQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
  });

  const updateMutation = useMutation(updateMonthlyFeedbackRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      handleClose();
      queryClient.refetchQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
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
      <p className="text-3xl font-extralight mb-4">
        {
          Months[
            typeof monthlyFeedback === "string"
              ? monthlyFeedback
              : new Date(monthlyFeedback.createdAt).getMonth()
          ]
        }
      </p>

      <ControlledTextArea
        name="positiveFeedback"
        label="Positive Feedback"
        control={control}
        placeholder="What did they do really well this month..."
        rows={10}
      />
      <ControlledTextArea
        name="negativeFeedback"
        label="Negative Feedback"
        control={control}
        placeholder="Where is there room for improvement..."
        rows={10}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={updateMutation.isLoading}
      >
        Update Feedback
      </Button>
      <Button onClick={handleClose}>Cancel</Button>
      {updateMutation.isError && (
        <ErrorText>
          Something went wrong. {updateMutation.error.message}
        </ErrorText>
      )}
    </form>
  );
};
