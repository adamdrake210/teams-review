import React from "react";

import { TeamMemberProps } from "@/pages/team-members/[id]";
import { MonthlyFeedbackDetails } from "@/components/MonthlyFeedbackDetails";
import { CardContainer } from "@/components/ui/CardContainer";
import { MonthlyFeedback } from "@prisma/client";

function compare(a: MonthlyFeedback, b: MonthlyFeedback) {
  if (a.month < b.month) {
    return -1;
  }
  if (a.month > b.month) {
    return 1;
  }
  return 0;
}

export const TeamMemberFeedback = ({
  teamMember,
  feedback,
}: TeamMemberProps) => {
  const { firstName } = teamMember;

  return (
    <>
      {feedback?.length > 0 ? (
        feedback.map((fb) => {
          return (
            <CardContainer
              key={fb.id}
              headerText={`Feedback for ${fb.yearOfFeedback}`}
            >
              {fb?.monthlyFeedback?.length > 0 ? (
                (fb?.monthlyFeedback).sort(compare).map((monthFb) => {
                  return (
                    <MonthlyFeedbackDetails
                      key={monthFb.id}
                      monthlyFeedback={monthFb}
                    />
                  );
                })
              ) : (
                <p>
                  No feedback available for {firstName} for this year at the
                  moment.
                </p>
              )}
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
