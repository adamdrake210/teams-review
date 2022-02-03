import React from "react";
import { Team } from "@prisma/client";
import { useRouter } from "next/router";

import { CardContainer } from "../ui/CardContainer";
import { EditButton } from "../ui/buttons/EditButton";
import { DeleteButton } from "../ui/buttons/DeleteButton";
import { TeamDeleteModal } from "./TeamDeleteModal";
import { useOpen } from "@/utils/useOpen";
import { TEAMS_EDIT } from "@/constants/routerConstants";

type TeamCardProps = {
  team: Team;
};

export const TeamCard = ({ team }: TeamCardProps) => {
  const router = useRouter();
  const { open, handleClose, handleOpen } = useOpen();

  const handleEditButton = (id: Team["id"]) => {
    router.push(`${TEAMS_EDIT}${id}`);
  };

  return (
    <>
      <CardContainer
        key={team.id}
        headerText={team.title}
        className="w-full sm:w-1/3 h-[100%] min-h-[250px]"
      >
        <div className="flex flex-col min-h-[160px] justify-between">
          <p>{team.description}</p>
          <div className="flex space-x-2">
            <EditButton onClick={() => handleEditButton(team.id)} />
            <DeleteButton onClick={handleOpen} />
          </div>
        </div>
      </CardContainer>
      <TeamDeleteModal open={open} handleClose={handleClose} team={team} />
    </>
  );
};
