import React from "react";
import { TeamMember } from "@prisma/client";

import { TeamMembersCard } from "./TeamMembersCard";

type MyTeamMembersProps = {
  user?: {
    email?: string;
    name?: string;
    image?: string;
  };
  teamMembers: TeamMember[];
};

export const MyTeamMembers = ({ teamMembers }: MyTeamMembersProps) => {
  return (
    <div>
      <h2 className="text-3xl font-extralight mb-4">Team Members</h2>
      <TeamMembersCard teamMembers={teamMembers} />
    </div>
  );
};
