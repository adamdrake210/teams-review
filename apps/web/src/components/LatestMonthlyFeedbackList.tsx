import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import { MonthlyFeedback } from "@prisma/client";
import { MonthlyFeedbackCard } from "./monthlyFeedback/MonthlyFeedbackCard";
import { Paragraph } from "./ui/typography/Paragraph";

type TeamMembersWithMonthlyFeedback = {
  firstName: string;
  lastName: string;
  id: string;
  monthlyFeedback: MonthlyFeedback[];
};

type LatestMonthlyFeedbackListProps = {
  teamMembers: Array<TeamMembersWithMonthlyFeedback>;
};

export const LatestMonthlyFeedbackList = ({
  teamMembers,
}: LatestMonthlyFeedbackListProps) => {
  return (
    <>
      {teamMembers.map((teamMember, i) => {
        return (
          <Box
            sx={{ width: "100%", my: 2 }}
            key={`${i}${teamMember.firstName}`}
          >
            <Typography component="h3" variant="h5" gutterBottom>
              {teamMember.firstName} {teamMember.lastName}
            </Typography>
            <Grid container spacing={2}>
              {teamMember.monthlyFeedback?.length > 0 ? (
                teamMember.monthlyFeedback.map((mfb, i) => {
                  return (
                    <Grid key={`${mfb.createdAt}${i}`} item xs={4}>
                      <MonthlyFeedbackCard
                        monthlyFeedback={mfb}
                        teamMemberId={teamMember.id}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Paragraph>
                  Currently you haven&apos;t written any feedback.
                </Paragraph>
              )}
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
