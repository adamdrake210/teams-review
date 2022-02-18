import React from "react";
import { TeamMember } from "@prisma/client";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { Button, Typography } from "@mui/material";

import { TEAM_MEMBERS, TEAM_MEMBERS_CREATE } from "@/constants/routerConstants";
import { CardContainer } from "@/components/ui/CardContainer";

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
              href={`${TEAM_MEMBERS}${teamMember.id}`}
              passHref
              key={teamMember.id}
            >
              <Typography
                key={teamMember.id}
                variant="h6"
                sx={{
                  ":hover": { textDecoration: "underline", cursor: "pointer" },
                }}
              >
                <span className="font-bold">
                  {teamMember.firstName} {teamMember.lastName}
                </span>{" "}
                - {teamMember.position}
              </Typography>
            </Link>
          );
        })
      ) : (
        <Typography variant="subtitle1">
          Currently you have no team members.
        </Typography>
      )}
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          router.push(TEAM_MEMBERS_CREATE);
        }}
        sx={{ mt: 2 }}
      >
        Create Team Member
      </Button>
    </CardContainer>
  );
};
