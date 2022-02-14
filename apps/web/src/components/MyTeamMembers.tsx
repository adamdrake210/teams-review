import React from "react";
import { TeamMember } from "@prisma/client";
import { Typography } from "@mui/material";

import { TeamMembersCard } from "@/components/teamMember/TeamMembersCard";

type MyTeamMembersProps = {
  teamMembers: TeamMember[];
  className?: string;
};

export const MyTeamMembers = ({
  teamMembers,
  className,
}: MyTeamMembersProps) => {
  return (
    <div className={className || ""}>
      <Typography component="h2" variant="h4">
        Team Members
      </Typography>

      <TeamMembersCard teamMembers={teamMembers} />
    </div>
  );
};
