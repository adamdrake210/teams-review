import React from "react";
import { TeamMember } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import { TEAM_MEMBER, TEAM_MEMBERS_CREATE } from "../constants/routerConstants";
import { Button } from "./ui/Button";
import { CardContainer } from "./ui/CardContainer";

type TeamMembersCardProps = {
  teamMembers: TeamMember[];
};

export const TeamMembersCard = ({ teamMembers }: TeamMembersCardProps) => {
  const router = useRouter();

  return (
    <CardContainer headerText="Current Team Members">
      {teamMembers.map((teamMember) => {
        return (
          <Link
            href={`${TEAM_MEMBER}${teamMember.id}`}
            passHref
            key={teamMember.id}
          >
            <p
              key={teamMember.id}
              className="mb-2 cursor-pointer hover:underline text-sky-400 hover:text-sky-600"
            >
              <span className="font-bold">
                {teamMember.firstName} {teamMember.lastName}
              </span>{" "}
              - {teamMember.position}
            </p>
          </Link>
        );
      })}
      <Button
        className="mt-6"
        btnText="Create Team Member"
        color="primary"
        onClick={() => {
          router.push(TEAM_MEMBERS_CREATE);
        }}
      />
    </CardContainer>
  );
};
