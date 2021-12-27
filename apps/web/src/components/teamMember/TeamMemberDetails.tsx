import React from "react";
import { useRouter } from "next/dist/client/router";

import { CardContainer } from "@/components/ui/CardContainer";
import { Button } from "@/components/ui/Button";
import { TEAM_MEMBERS_EDIT } from "@/constants/routerConstants";
import { TeamMemberProps } from "@/pages/team-members/[id]";

export const TeamMemberDetails = ({ teamMember }: TeamMemberProps) => {
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
