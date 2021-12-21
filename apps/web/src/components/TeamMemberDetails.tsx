import React from "react";
import { useRouter } from "next/dist/client/router";

import { Team, TeamMember } from "@prisma/client";
import { CardContainer } from "./ui/CardContainer";
import { Button } from "./ui/Button";
import { TEAM_MEMBERS_EDIT } from "@/constants/routerConstants";

type TeamMemberDetailsProps = {
  teamMember: TeamMember & { team: Team };
};

export const TeamMemberDetails = ({ teamMember }: TeamMemberDetailsProps) => {
  const router = useRouter();

  const { id, firstName, lastName, joined, position, team } = teamMember;

  return (
    <CardContainer headerText="Team Member Details">
      <p>
        Name: {firstName} {lastName}
      </p>
      <p>Position: {position}</p>
      <p>Joined: {joined}</p>
      <p>Current Team: {team.title}</p>
      <Button
        className="mt-6"
        btnText="Update Team Member"
        color="primary"
        onClick={() => {
          router.push(`${TEAM_MEMBERS_EDIT}${id}`);
        }}
      />
    </CardContainer>
  );
};
