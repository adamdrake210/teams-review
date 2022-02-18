import React from "react";
import { TeamMember } from "@prisma/client";
import { Box, Typography } from "@mui/material";

import { TeamMembersCard } from "@/components/teamMember/TeamMembersCard";

type MyTeamMembersProps = {
  teamMembers: TeamMember[];
};

export const MyTeamMembers = ({ teamMembers }: MyTeamMembersProps) => {
  return (
    <Box>
      <Typography component="h2" variant="h4" gutterBottom>
        Team Members
      </Typography>
      <TeamMembersCard teamMembers={teamMembers} />
    </Box>
  );
};
