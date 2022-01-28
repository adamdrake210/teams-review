import React from "react";
import { Team } from "@prisma/client";
import { CardContainer } from "@/components/ui/CardContainer";

type TeamsListProps = {
  teams: Team[];
};

export const TeamsList = ({ teams }: TeamsListProps) => {
  return (
    <div className="flex flex-col sm:flex-row space-x-4">
      {teams.map((team) => {
        return (
          <CardContainer
            key={team.id}
            headerText={team.title}
            className="w-1/3"
          >
            <p>{team.description}</p>
          </CardContainer>
        );
      })}
    </div>
  );
};
