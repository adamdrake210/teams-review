import React from "react";
import { useRouter } from "next/dist/client/router";

import { Months } from "@/types/types";
import { CardContainer } from "@/components/ui/CardContainer";
import { MonthlyFeedback } from "@prisma/client";
import { EditButton } from "@/components/ui/EditButton";
import { FEEDBACKS_EDIT } from "@/constants/routerConstants";
import { Heading4 } from "@/components/ui/typography/Heading4";

type MonthlyFeedbackCardProps = {
  feedback: MonthlyFeedback;
  yearOfFeedback: number;
};

export const MonthlyFeedbackCard = ({
  feedback,
  yearOfFeedback,
}: MonthlyFeedbackCardProps) => {
  const router = useRouter();

  const { positiveFeedback, negativeFeedback } = feedback;

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
      <Heading4>
        {positiveFeedback ? "Positive Feedback" : "Negative Feedback"}
      </Heading4>
      <p>{feedback.positiveFeedback || feedback.negativeFeedback}</p>
      <EditButton onClick={handleMonthlyFeedbackUpdate} />
    </CardContainer>
  );
};
