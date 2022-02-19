import React from "react";
import { Box, Typography } from "@mui/material";

import { MonthlyFeedbackDetails } from "@/components/monthlyFeedback/MonthlyFeedbackDetails";
import { RQ_KEY_TEAM_MEMBER } from "@/constants/constants";
import { getTeamMemberRequest } from "@/services/api/teamMembersApi";
import { useQuery } from "react-query";
import { MonthlyFeedback, TeamMember } from "@prisma/client";
import { useRouter } from "next/router";
import { Loading } from "../Loading";

export const TeamMemberFeedback = () => {
  const router = useRouter();
  const { id } = router.query;

  console.log("tmid: ", id);

  const {
    data: teamMemberData,
    isLoading,
    isError,
    error,
  } = useQuery<TeamMember & { monthlyFeedback: MonthlyFeedback[] }, Error>(
    [RQ_KEY_TEAM_MEMBER],
    () => getTeamMemberRequest(String(id))
  );

  console.log("teamMemberData:", teamMemberData);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <Box
        sx={{ display: "flex", flexDirection: "column", mb: 4 }}
        component="section"
      >
        <Typography component="h2" variant="h4" gutterBottom>
          Feedback Details
        </Typography>
        {teamMemberData && (
          <MonthlyFeedbackDetails
            monthlyFeedback={teamMemberData.monthlyFeedback}
            teamMemberId={String(id)}
          />
        )}
      </Box>
    </Loading>
  );
};
