import React from "react";
import { Box, Typography } from "@mui/material";

import { TeamMemberProps } from "@/pages/team-members/[id]";
import { MonthlyFeedbackDetails } from "@/components/monthlyFeedback/MonthlyFeedbackDetails";

export const TeamMemberFeedback = ({ teamMember }: TeamMemberProps) => {
  const { monthlyFeedback, id } = teamMember;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", mb: 4 }}
      component="section"
    >
      <Typography component="h2" variant="h4" gutterBottom>
        Feedback Details
      </Typography>
      <MonthlyFeedbackDetails
        monthlyFeedback={monthlyFeedback}
        teamMemberId={id}
      />
    </Box>
  );
};
