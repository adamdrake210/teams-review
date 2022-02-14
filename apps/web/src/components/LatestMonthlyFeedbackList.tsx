import React from "react";
import { Typography } from "@mui/material";

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
    <div className="flex flex-col">
      {teamMembers.map((teamMember, i) => {
        return (
          <div key={`${i}${teamMember.firstName}`} className="flex flex-col">
            <Typography component="h3" variant="h5" gutterBottom>
              {teamMember.firstName} {teamMember.lastName}
            </Typography>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              {teamMember.monthlyFeedback?.length > 0 ? (
                teamMember.monthlyFeedback.map((mfb, i) => {
                  return (
                    <MonthlyFeedbackCard
                      key={`${mfb.createdAt}${i}`}
                      monthlyFeedback={mfb}
                      teamMemberId={teamMember.id}
                    />
                  );
                })
              ) : (
                <Paragraph>
                  Currently you haven&apos;t written any feedback.
                </Paragraph>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
