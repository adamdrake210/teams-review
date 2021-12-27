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

type MonthlyFeedbackFormProps = {
  monthlyFeedback: MonthlyFeedback;
  teamMemberId: string;
};

export const MonthlyFeedbackForm = ({
  monthlyFeedback,
  teamMemberId,
}: MonthlyFeedbackFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      feedback: monthlyFeedback.feedback,
    },
  });

  const updateMutation = useMutation(updateMonthlyFeedbackRequest, {
    onError: (err: Error) => {
      console.error(err.message);
    },
    onSuccess: () => {
      router.push(`${TEAM_MEMBER}${teamMemberId}`);
      queryClient.refetchQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries([RQ_KEY_USER, RQ_KEY_FEEDBACKS_ALL]);
    },
  });

  type FormData = {
    feedback: string;
  };

  const onSubmit = (formData: FormData) => {
    updateMutation.mutate({
      id: monthlyFeedback.id,
      feedback: formData.feedback,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md my-8">
      <p>{Months[monthlyFeedback.month]}</p>

      <ControlledTextArea
        name="feedback"
        label="Feedback"
        control={control}
        placeholder="Write your feedback here..."
        rows={8}
      />

      <Button
        type="submit"
        btnText="Update Feedback"
        color="primary"
        disabled={updateMutation.isLoading}
      />
    </form>
  );
};
