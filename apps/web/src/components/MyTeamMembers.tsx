import { TeamMember } from "@prisma/client";
import { User } from "next-auth";
import React from "react";

type MyTeamMembersProps = {
  user: {
    email?: string;
    name?: string;
    image?: string;
  };
  teamMembers: TeamMember[];
};

export const MyTeamMembers = ({ user, teamMembers }: MyTeamMembersProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Team Members</h1>
      <ul>
        {teamMembers.map((teamMember) => {
          return (
            <li key={teamMember.id}>
              {teamMember.firstName} {teamMember.lastName} - Joined{" "}
              {teamMember.joined}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
