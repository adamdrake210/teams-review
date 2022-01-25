import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/dist/client/router";

import { updateMonthlyFeedbackRequest } from "@/services/api/monthlyFeedbackApi";
import { MonthlyFeedback } from "@prisma/client";
import { Months } from "@/types/types";
import { TEAM_MEMBER } from "@/constants/routerConstants";
import { RQ_KEY_FEEDBACKS_ALL, RQ_KEY_USER } from "@/constants/constants";
import { Button } from "@/components/ui/Button";
import { ControlledTextArea } from "@/components/ui/forms/ControlledTextArea";
import { ErrorText } from "../ui/typography/ErrorText";

type MonthlyFeedbackFormProps = {
  monthlyFeedback: MonthlyFeedback | string;
  handleClose: () => void;
};

export const MonthlyFeedbackForm = ({
  monthlyFeedback,
  handleClose,
}: MonthlyFeedbackFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      positiveFeedback: monthlyFeedback?.positiveFeedback,
      negativeFeedback: monthlyFeedback?.negativeFeedback,
    },
  });

  const updateMutation = useMutation(updateMonthlyFeedbackRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      router.push(`${TEAM_MEMBER}${monthlyFeedback.teamMemberId}`);
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
    updateMutation.mutate({
      id: monthlyFeedback.id,
      positiveFeedback: formData.positiveFeedback,
      negativeFeedback: formData.negativeFeedback,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md my-8">
      <p>
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
        rows={8}
      />
      <ControlledTextArea
        name="negativeFeedback"
        label="Negative Feedback"
        control={control}
        placeholder="Where is there room for improvement..."
        rows={8}
      />

      <Button
        type="submit"
        btnText="Update Feedback"
        color="primary"
        disabled={updateMutation.isLoading}
      />
      <Button
        type="button"
        onClick={handleClose}
        btnText="Cancel"
        className="ml-2"
      />
      {updateMutation.isError && (
        <ErrorText>
          Something went wrong. {updateMutation.error.message}
        </ErrorText>
      )}
    </form>
  );
};
