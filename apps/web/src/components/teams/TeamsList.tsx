import React from "react";
import { Team } from "@prisma/client";

import { TeamCard } from "./TeamCard";

type TeamsListProps = {
  teams: Team[];
};

export const TeamsList = ({ teams }: TeamsListProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
      {teams.map((team) => {
        return <TeamCard key={team.id} team={team} />;
      })}
    </div>
  );
};
