import React from "react";
import { Team } from "@prisma/client";
import { CardContainer } from "@/components/ui/CardContainer";
import { EditButton } from "../ui/EditButton";
import { useRouter } from "next/router";
import { TEAMS_EDIT } from "@/constants/routerConstants";

type TeamsListProps = {
  teams: Team[];
};

export const TeamsList = ({ teams }: TeamsListProps) => {
  const router = useRouter();

  const handleEditButton = (id: Team["id"]) => {
    router.push(`${TEAMS_EDIT}${id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:space-x-4 w-full">
      {teams.map((team) => {
        return (
          <CardContainer
            key={team.id}
            headerText={team.title}
            className="w-full sm:w-1/3"
          >
            <p>{team.description}</p>

            <EditButton onClick={() => handleEditButton(team.id)} />
          </CardContainer>
        );
      })}
    </div>
  );
};
