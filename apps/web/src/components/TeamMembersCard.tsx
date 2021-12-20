import { TeamMember } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { TEAM_MEMBERS_CREATE } from "../constants/routerConstants";
import { Button } from "./ui/Button";

type TeamMembersCardProps = {
  teamMembers: TeamMember[];
};

export const TeamMembersCard = ({ teamMembers }: TeamMembersCardProps) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-lg shadow-2xl w-3/4">
      <header className="bg-gray-100 rounded-t-lg py-3 px-8 text-xl font-extrabold">
        Current Team Members
      </header>
      <div className="px-8 py-4">
        {teamMembers.map((teamMember) => {
          return (
            <p key={teamMember.id} className="mb-2">
              <span className="font-bold">
                {teamMember.firstName} {teamMember.lastName}
              </span>{" "}
              - {teamMember.position}
            </p>
          );
        })}
        <Button
          className="mt-6"
          btnText="Add Team Member"
          color="primary"
          onClick={() => {
            router.push(TEAM_MEMBERS_CREATE);
          }}
        />
      </div>
    </div>
  );
};
