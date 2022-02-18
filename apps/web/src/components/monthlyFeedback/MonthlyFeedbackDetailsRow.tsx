import React from "react";
import { Box, Grid } from "@mui/material";

import { MonthlyFeedback, TeamMember } from "@prisma/client";
import { Months } from "@/types/types";
import FeedbackDetails from "./FeedbackDetails";
import { EditButton } from "@/components/ui/buttons/EditButton";
import { useOpen } from "@/utils/useOpen";
import { MonthlyFeedbackForm } from "./MonthlyFeedbackForm";
import ModalContainer from "../ui/ModalContainer";
import { CardContainer } from "../ui/CardContainer";

type FeedbackDetailsRowProps = {
  mfb: MonthlyFeedback | string;
  teamMemberId: TeamMember["id"];
};

export const MonthlyFeedbackDetailsRow = ({
  mfb,
  teamMemberId,
}: FeedbackDetailsRowProps) => {
  const { open, handleClose, handleOpen } = useOpen();

  return (
    <Grid item xs={12}>
      <CardContainer
        headerText={
          Months[
            typeof mfb === "string" ? mfb : new Date(mfb.createdAt).getMonth()
          ]
        }
        action={<EditButton onClick={handleOpen} />}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <FeedbackDetails
            feedback={typeof mfb === "string" ? mfb : mfb.positiveFeedback}
            monthlyFeedback={mfb}
            sign="positive"
          />
          <FeedbackDetails
            feedback={typeof mfb === "string" ? mfb : mfb.negativeFeedback}
            monthlyFeedback={mfb}
            sign="negative"
          />

          <ModalContainer handleClose={handleClose} open={open}>
            <MonthlyFeedbackForm
              monthlyFeedback={mfb}
              handleClose={handleClose}
              teamMemberId={teamMemberId}
            />
          </ModalContainer>
        </Box>
      </CardContainer>
    </Grid>
  );
};
