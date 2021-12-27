import React from "react";
import { useRouter } from "next/dist/client/router";

import { Months } from "@/types/types";
import { CardContainer } from "@/components/ui/CardContainer";
import { MonthlyFeedback } from "@prisma/client";
import { EditButton } from "@/components/ui/EditButton";
import { FEEDBACKS_EDIT } from "@/constants/routerConstants";

type MonthlyFeedbackCardProps = {
  feedback: MonthlyFeedback;
  yearOfFeedback: number;
};

export const MonthlyFeedbackCard = ({
  feedback,
  yearOfFeedback,
}: MonthlyFeedbackCardProps) => {
  const router = useRouter();

  const handleMonthlyFeedbackUpdate = () => {
    router.push({
      pathname: `${FEEDBACKS_EDIT}${feedback.feedbackId}`,
      query: { month: feedback.month },
    });
  };

  return (
    <CardContainer
      className="flex-1 sm:basis-1/3"
      headerText={`${Months[feedback.month]} - ${yearOfFeedback}`}
    >
      <p>{feedback.feedback}</p>
      <EditButton onClick={handleMonthlyFeedbackUpdate} />
    </CardContainer>
  );
};
