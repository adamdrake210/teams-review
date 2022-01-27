import React from "react";
import { useQuery } from "react-query";

import { getLatestMonthlyFeedback } from "@/services/api/monthlyFeedbackApi";
import { Heading2 } from "@/components/ui/typography/Heading2";
import { RQ_KEY_FEEDBACKS_ALL } from "@/constants/constants";
import { Loading } from "./Loading";
import { LatestMonthlyFeedbackList } from "./LatestMonthlyFeedbackList";
import { Paragraph } from "./ui/typography/Paragraph";

type LatestMonthlyFeedbackProps = {
  className?: string;
};

export const LatestMonthlyFeedback = ({
  className,
}: LatestMonthlyFeedbackProps) => {
  const {
    data: teamMembers,
    isLoading,
    isError,
    error,
  } = useQuery(RQ_KEY_FEEDBACKS_ALL, getLatestMonthlyFeedback);

  console.log("data: ", teamMembers);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className={className}>
        <Heading2>Latest Feedback</Heading2>
        {teamMembers?.length > 0 ? (
          <LatestMonthlyFeedbackList teamMembers={teamMembers} />
        ) : (
          <Paragraph>
            Currently you haven&apos;t written any feedback.
          </Paragraph>
        )}
      </div>
    </Loading>
  );
};
