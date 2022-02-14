import React from "react";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";

import { getLatestMonthlyFeedback } from "@/services/api/monthlyFeedbackApi";
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

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className={className}>
        <Typography component="h2" variant="h4">
          Latest Feedback
        </Typography>
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
