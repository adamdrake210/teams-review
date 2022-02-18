import React from "react";
import { Team } from "@prisma/client";
import { Grid } from "@mui/material";

import { TeamCard } from "./TeamCard";

type TeamsListProps = {
  teams: Team[];
};

export const TeamsList = ({ teams }: TeamsListProps) => {
  return (
    <Grid container spacing={2}>
      {teams.map((team) => {
        return (
          <Grid item key={team.id} xs={12} sm={6}>
            <TeamCard team={team} />
          </Grid>
        );
      })}
    </Grid>
  );
};
