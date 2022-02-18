import React from "react";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import { CardActions, Grid, Typography } from "@mui/material";

import { CardContainer } from "@/components/ui/CardContainer";
import { TEAM_MEMBERS_EDIT } from "@/constants/routerConstants";
import { TeamMemberProps } from "@/pages/team-members/[id]";
import { useOpen } from "@/utils/useOpen";
import { TeamMemberDeleteModal } from "./TeamMemberDeleteModal";
import { DeleteButton } from "../ui/buttons/DeleteButton";
import { EditButton } from "../ui/buttons/EditButton";

export const TeamMemberDetails = ({ teamMember }: TeamMemberProps) => {
  const router = useRouter();
  const { open, handleClose, handleOpen } = useOpen();

  const { id, firstName, lastName, joined, position, team } = teamMember;

  return (
    <Grid container spacing={2} component="section" sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6}>
        <CardContainer headerText="Team Member Details">
          <Typography variant="subtitle1">
            <b>Name:</b> {firstName} {lastName}
          </Typography>
          <Typography variant="subtitle1">
            <b>Position:</b> {position}
          </Typography>
          <Typography variant="subtitle1">
            <b>Joined:</b> {format(new Date(joined), "dd/MM/yyyy")}
          </Typography>
          <Typography variant="subtitle1">
            <b>Current Team:</b> {team ? team.title : "No team"}
          </Typography>
          <CardActions>
            <EditButton
              onClick={() => {
                router.push(`${TEAM_MEMBERS_EDIT}${id}`);
              }}
            />
            <DeleteButton onClick={handleOpen} />
          </CardActions>
        </CardContainer>
      </Grid>
      <TeamMemberDeleteModal
        open={open}
        handleClose={handleClose}
        teamMember={teamMember}
      />
    </Grid>
  );
};
