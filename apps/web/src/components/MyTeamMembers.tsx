import React from "react";
import { TeamMember } from "@prisma/client";

import { TeamMembersCard } from "./TeamMembersCard";
import { Heading2 } from "./ui/typography/Heading2";

type MyTeamMembersProps = {
  teamMembers: TeamMember[];
};

export const MyTeamMembers = ({ teamMembers }: MyTeamMembersProps) => {
  return (
    <div>
      <Heading2>Team Members</Heading2>
      <TeamMembersCard teamMembers={teamMembers} />
    </div>
  );
};
