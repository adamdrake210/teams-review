import { TeamMemberProps } from "@/pages/team-members/[id]";
import { Months } from "@/types/types";
import { Feedback, TeamMember } from "@prisma/client";
import React from "react";
import { CardContainer } from "./ui/CardContainer";

export const TeamMemberFeedback = ({
  teamMember,
  feedback,
}: TeamMemberProps) => {
  const { id, firstName, lastName, joined, position } = teamMember;

  console.log("feedback: ", feedback);

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
                    <div key={monthFb.id}>
                      <p className="text-xl">{Months[monthFb.month]}</p>
                      <p>{monthFb.feedback}</p>
                    </div>
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
