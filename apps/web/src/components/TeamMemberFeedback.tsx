import React from "react";

import { TeamMemberProps } from "@/pages/team-members/[id]";
import { MonthlyFeedbackDetails } from "./MonthlyFeedbackDetails";
import { CardContainer } from "./ui/CardContainer";
import { Button } from "./ui/Button";

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
                fb?.monthlyFeedback.map((monthFb) => {
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
              <Button btnText="Add Feedback" color="primary" />
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
