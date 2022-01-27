import React from "react";

import { MonthlyFeedback } from "@prisma/client";
import { MonthlyFeedbackCard } from "./monthlyFeedback/MonthlyFeedbackCard";
import { Heading3 } from "./ui/typography/Heading3";
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
            <Heading3>
              {teamMember.firstName} {teamMember.lastName}
            </Heading3>
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
