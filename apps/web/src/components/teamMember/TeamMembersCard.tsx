import React from "react";
import { TeamMember } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import { TEAM_MEMBER, TEAM_MEMBERS_CREATE } from "@/constants/routerConstants";
import { Button } from "@/components/ui/Button";
import { CardContainer } from "@/components/ui/CardContainer";
import { Paragraph } from "../ui/typography/paragraph";

type TeamMembersCardProps = {
  teamMembers: TeamMember[];
};

export const TeamMembersCard = ({ teamMembers }: TeamMembersCardProps) => {
  const router = useRouter();

  return (
    <CardContainer headerText="Current Team Members">
      {teamMembers?.length > 0 ? (
        teamMembers.map((teamMember) => {
          return (
            <Link
              href={`${TEAM_MEMBER}${teamMember.id}`}
              passHref
              key={teamMember.id}
            >
              <p
                key={teamMember.id}
                className="mb-2 cursor-pointer hover:underline text-gray-500 hover:text-green-600"
              >
                <span className="font-bold">
                  {teamMember.firstName} {teamMember.lastName}
                </span>{" "}
                - {teamMember.position}
              </p>
            </Link>
          );
        })
      ) : (
        <Paragraph>Currently you have no team members.</Paragraph>
      )}
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
