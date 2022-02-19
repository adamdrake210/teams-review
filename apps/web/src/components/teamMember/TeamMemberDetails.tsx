import React from "react";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import { Box, CardActions, Grid, Typography } from "@mui/material";

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
    <Box sx={{ display: "flex", flexDirection: "column" }} component="section">
      <Typography component="h2" variant="h4" gutterBottom>
        Overview Details
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <CardContainer
            headerText="Current Details"
            action={
              <>
                <EditButton
                  onClick={() => {
                    router.push(`${TEAM_MEMBERS_EDIT}${id}`);
                  }}
                />
                <DeleteButton onClick={handleOpen} color="error" />
              </>
            }
          >
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
          </CardContainer>
        </Grid>
        <TeamMemberDeleteModal
          open={open}
          handleClose={handleClose}
          teamMember={teamMember}
        />
      </Grid>
    </Box>
  );
};
