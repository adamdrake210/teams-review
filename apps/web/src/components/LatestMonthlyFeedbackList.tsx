import React from "react";

import { MonthlyFeedback } from "@prisma/client";
import { MonthlyFeedbackCard } from "./monthlyFeedback/MonthlyFeedbackCard";
import { Heading3 } from "./ui/typography/Heading3";
import { Paragraph } from "./ui/typography/Paragraph";

type TeamMembersWithMonthlyFeedback = {
  firstName: string;
  lastName: string;
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
      {teamMembers?.length > 0 ? (
        teamMembers.map((teamMember, i) => {
          return (
            <div key={`${i}${teamMember.firstName}`} className="flex flex-col">
              <Heading3>
                {teamMember.firstName} {teamMember.lastName}
              </Heading3>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                {teamMember?.monthlyFeedback.map((mfb, i) => {
                  if (
                    mfb.positiveFeedback.length > 0 ||
                    mfb.negativeFeedback.length > 0
                  ) {
                    return (
                      <MonthlyFeedbackCard
                        key={`${mfb.createdAt}${i}`}
                        monthlyFeedback={mfb}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        })
      ) : (
        <Paragraph>Currently you haven&apos;t written any feedback.</Paragraph>
      )}
    </div>
  );
};
