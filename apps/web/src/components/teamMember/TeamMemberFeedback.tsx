import React from "react";

import { TeamMemberProps } from "@/pages/team-members/[id]";
import { MonthlyFeedbackDetails } from "@/components/monthlyFeedback/MonthlyFeedbackDetails";
import { CardContainer } from "@/components/ui/CardContainer";

// function compare(a: MonthlyFeedback, b: MonthlyFeedback) {
//   if (a.month < b.month) {
//     return -1;
//   }
//   if (a.month > b.month) {
//     return 1;
//   }
//   return 0;
// }

export const TeamMemberFeedback = ({ teamMember }: TeamMemberProps) => {
  const { firstName, monthlyFeedback } = teamMember;

  console.log("mfb: ", monthlyFeedback);

  return (
    <>
      {monthlyFeedback.length > 0 ? (
        monthlyFeedback.map((mfb) => {
          return (
            <CardContainer
              key={mfb.id}
              headerText={`Feedback for ${new Date(
                mfb.createdAt
              ).getFullYear()}`}
            >
              <MonthlyFeedbackDetails key={mfb.id} monthlyFeedback={mfb} />
            </CardContainer>
          );
        })
      ) : (
        <CardContainer headerText="Feedback">
          <p>No feedback available for {firstName} yet.</p>
        </CardContainer>
      )}
    </>
  );
};
