import React from "react";
import { useQuery } from "react-query";
import { Box, Typography } from "@mui/material";

import { getLatestMonthlyFeedback } from "@/services/api/monthlyFeedbackApi";
import { RQ_KEY_FEEDBACKS_ALL } from "@/constants/constants";
import { Loading } from "./Loading";
import { LatestMonthlyFeedbackList } from "./LatestMonthlyFeedbackList";

export const LatestMonthlyFeedback = () => {
  const {
    data: teamMembers,
    isLoading,
    isError,
    error,
  } = useQuery(RQ_KEY_FEEDBACKS_ALL, getLatestMonthlyFeedback);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <Box component="section" sx={{ my: 2, width: "100%" }}>
        <Typography component="h2" variant="h4">
          Latest Feedback
        </Typography>
        {teamMembers?.length > 0 ? (
          <LatestMonthlyFeedbackList teamMembers={teamMembers} />
        ) : (
          <Typography variant="subtitle1">
            Currently you haven&apos;t written any feedback.
          </Typography>
        )}
      </Box>
    </Loading>
  );
};
