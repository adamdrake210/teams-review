import { TeamMemberProps } from "@/pages/team-members/[id]";
import { Feedback, TeamMember } from "@prisma/client";
import React from "react";
import { CardContainer } from "./ui/CardContainer";

export const TeamMemberFeedback = ({ teamMember }: TeamMemberProps) => {
  const { id, firstName, lastName, joined, position, feedback } = teamMember;
  return (
    <>
      {feedback ? (
        feedback.map((fb) => {
          return (
            <CardContainer
              key={fb.id}
              headerText={`Feedback for ${fb.yearOfFeedback}`}
            >
              {fb.monthlyReview.map((monthReview) => {
                return <p key={monthReview}>{monthReview}</p>;
              })}
            </CardContainer>
          );
        })
      ) : (
        <CardContainer headerText="Feedback">
          <p>No feedback available for {firstName} at this time.</p>
        </CardContainer>
      )}
    </>
  );
};
