import React from "react";
import { useRouter } from "next/router";

import { TeamMemberProps } from "@/pages/team-members/[id]";
import { MonthlyFeedbackDetails } from "@/components/monthlyFeedback/MonthlyFeedbackDetails";
import { CardContainer } from "@/components/ui/CardContainer";

export const TeamMemberFeedback = ({ teamMember }: TeamMemberProps) => {
  const { firstName, monthlyFeedback, id } = teamMember;

  return (
    <CardContainer headerText={`Feedback for ${firstName}`}>
      <MonthlyFeedbackDetails
        monthlyFeedback={monthlyFeedback}
        teamMemberId={id}
      />
    </CardContainer>
  );
};
