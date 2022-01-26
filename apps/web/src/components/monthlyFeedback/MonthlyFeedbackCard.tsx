import React from "react";
import { useRouter } from "next/dist/client/router";

import { Months } from "@/types/types";
import { CardContainer } from "@/components/ui/CardContainer";
import { MonthlyFeedback } from "@prisma/client";
import { EditButton } from "@/components/ui/EditButton";
import { MONTHLY_FEEDBACK_EDIT } from "@/constants/routerConstants";
import { Heading4 } from "@/components/ui/typography/Heading4";

type MonthlyFeedbackCardProps = {
  monthlyFeedback: MonthlyFeedback;
};

export const MonthlyFeedbackCard = ({
  monthlyFeedback,
}: MonthlyFeedbackCardProps) => {
  const router = useRouter();

  const { positiveFeedback, negativeFeedback } = monthlyFeedback;

  const handleMonthlyFeedbackUpdate = () => {
    router.push({
      pathname: `${MONTHLY_FEEDBACK_EDIT}${monthlyFeedback.id}`,
    });
  };

  return (
    <CardContainer
      className="flex-1 sm:basis-1/3"
      headerText={`${
        Months[new Date(monthlyFeedback.createdAt).getMonth()]
      } - ${new Date(monthlyFeedback.createdAt).getFullYear()}`}
    >
      <Heading4>
        {positiveFeedback ? "Positive Feedback" : "Negative Feedback"}
      </Heading4>
      <p>
        {monthlyFeedback.positiveFeedback || monthlyFeedback.negativeFeedback}
      </p>
      <EditButton onClick={handleMonthlyFeedbackUpdate} />
    </CardContainer>
  );
};
