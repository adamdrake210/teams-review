import React from "react";
import { Team } from "@prisma/client";
import { useQuery } from "react-query";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { RQ_KEY_TEAMS } from "@/constants/constants";
import { Loading } from "@/components/Loading";
import { Paragraph } from "@/components/ui/typography/Paragraph";
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
      <section className="flex flex-col w-full sm:space-y-2">
        <Typography component="h2" variant="h4">
          Teams Information
        </Typography>
        {teams?.length > 0 ? (
          <TeamsList teams={teams} />
        ) : (
          <Paragraph>
            You don&apos;t currently have any teams. Why not create one?
          </Paragraph>
        )}
        <Button
          variant="contained"
          onClick={() => {
            router.push(TEAMS_CREATE);
          }}
        >
          Create New Team
        </Button>
      </section>
    </Loading>
  );
};
