import React from "react";
import { useRouter } from "next/dist/client/router";

import { CardContainer } from "@/components/ui/CardContainer";
import { Button } from "@/components/ui/Button";
import { TEAM_MEMBERS_EDIT } from "@/constants/routerConstants";
import { TeamMemberProps } from "@/pages/team-members/[id]";
import { DangerButton } from "../ui/buttons/DangerButton";
import { useOpen } from "@/utils/useOpen";
import { TeamMemberDeleteModal } from "./TeamMemberDeleteModal";

export const TeamMemberDetails = ({ teamMember }: TeamMemberProps) => {
  const router = useRouter();
  const { open, handleClose, handleOpen } = useOpen();

  const { id, firstName, lastName, joined, position, team } = teamMember;

  return (
    <>
      <CardContainer headerText="Team Member Details">
        <p>
          Name: {firstName} {lastName}
        </p>
        <p>Position: {position}</p>
        <p>Joined: {joined}</p>
        <p>Current Team: {team ? team.title : "No team"}</p>
        <div className="flex mt-6 space-x-2">
          <Button
            btnText="Update Team Member"
            color="primary"
            onClick={() => {
              router.push(`${TEAM_MEMBERS_EDIT}${id}`);
            }}
          />
          <DangerButton btnText="Delete Team Member" onClick={handleOpen} />
        </div>
      </CardContainer>
      <TeamMemberDeleteModal
        open={open}
        handleClose={handleClose}
        teamMember={teamMember}
      />
    </>
  );
};
