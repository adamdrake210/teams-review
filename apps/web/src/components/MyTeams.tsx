import React from "react";
import { Team } from "@prisma/client";
import { useQuery } from "react-query";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { RQ_KEY_TEAMS } from "@/constants/constants";
import { Loading } from "@/components/Loading";
import { getTeams } from "@/services/api/teamsApi";
import { TeamsList } from "./teams/TeamsList";
import { TEAMS_CREATE } from "@/constants/routerConstants";

export const MyTeams = () => {
  const router = useRouter();

  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useQuery<Team[], Error>(RQ_KEY_TEAMS, getTeams);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography component="h2" variant="h4" gutterBottom>
          Teams Information
        </Typography>
        {teams?.length > 0 ? (
          <TeamsList teams={teams} />
        ) : (
          <Typography variant="subtitle1">
            You don&apos;t currently have any teams. Why not create one?
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={() => {
            router.push(TEAMS_CREATE);
          }}
          sx={{ my: 2, maxWidth: 250 }}
        >
          Create New Team
        </Button>
      </Box>
    </Loading>
  );
};
