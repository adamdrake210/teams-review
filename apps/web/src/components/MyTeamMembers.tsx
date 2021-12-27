import React from "react";
import { TeamMember } from "@prisma/client";

import { TeamMembersCard } from "@/components/teamMember/TeamMembersCard";
import { Heading2 } from "@/components/ui/typography/Heading2";

type MyTeamMembersProps = {
  teamMembers: TeamMember[];
  className?: string;
};

export const MyTeamMembers = ({
  teamMembers,
  className,
}: MyTeamMembersProps) => {
  return (
    <div className={className || ""}>
      <Heading2>Team Members</Heading2>
      <TeamMembersCard teamMembers={teamMembers} />
    </div>
  );
};
