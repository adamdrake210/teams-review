import React from "react";
import { useQuery } from "react-query";

import { getLatestMonthlyFeedback } from "@/services/api/monthlyFeedbackApi";
import { Heading2 } from "@/components/ui/typography/Heading2";
import { RQ_KEY_FEEDBACKS_ALL } from "@/constants/constants";
import { Loading } from "./Loading";
import { LatestMonthlyFeedbackList } from "./LatestMonthlyFeedbackList";

type LatestMonthlyFeedbackProps = {
  className?: string;
};

export const LatestMonthlyFeedback = ({
  className,
}: LatestMonthlyFeedbackProps) => {
  const { data, isLoading, isError, error } = useQuery(
    RQ_KEY_FEEDBACKS_ALL,
    getLatestMonthlyFeedback
  );

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className={className}>
        <Heading2>Latest Feedback</Heading2>
        {data && <LatestMonthlyFeedbackList monthlyFeedbacks={data} />}
      </div>
    </Loading>
  );
};
