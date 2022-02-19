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
        action={
          <>
            <EditButton onClick={() => handleEditButton(team.id)} />
            <DeleteButton onClick={handleOpen} />
          </>
        }
      >
        <p>{team.description}</p>
      </CardContainer>
      <TeamDeleteModal open={open} handleClose={handleClose} team={team} />
    </>
  );
};
