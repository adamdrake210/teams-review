import React from "react";
import { useRouter } from "next/router";

import { TeamMemberProps } from "@/pages/team-members/[id]";
import { MonthlyFeedbackDetails } from "@/components/monthlyFeedback/MonthlyFeedbackDetails";
import { CardContainer } from "@/components/ui/CardContainer";

export const TeamMemberFeedback = ({ teamMember }: TeamMemberProps) => {
  const { firstName, monthlyFeedback } = teamMember;

  return (
    <CardContainer headerText={`Feedback`}>
      {monthlyFeedback?.length > 0 ? (
        <MonthlyFeedbackDetails monthlyFeedback={monthlyFeedback} />
      ) : (
        <CardContainer headerText="Feedback">
          <p>No feedback available for {firstName} yet.</p>
        </CardContainer>
      )}
    </CardContainer>
  );
};
