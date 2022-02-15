import React from "react";

import { Months } from "@/types/types";
import { CardContainer } from "@/components/ui/CardContainer";
import { MonthlyFeedback, TeamMember } from "@prisma/client";
import { EditButton } from "@/components/ui/buttons/EditButton";
import FeedbackDetails from "./FeedbackDetails";
import { useOpen } from "@/utils/useOpen";
import ModalContainer from "../ui/ModalContainer";
import { MonthlyFeedbackForm } from "./MonthlyFeedbackForm";

type MonthlyFeedbackCardProps = {
  monthlyFeedback: MonthlyFeedback;
  teamMemberId: TeamMember["id"];
};

export const MonthlyFeedbackCard = ({
  monthlyFeedback,
  teamMemberId,
}: MonthlyFeedbackCardProps) => {
  const { open, handleClose, handleOpen } = useOpen();

  const { positiveFeedback, negativeFeedback } = monthlyFeedback;

  return (
    <CardContainer
      headerText={`${
        Months[new Date(monthlyFeedback.createdAt).getMonth()]
      } - ${new Date(monthlyFeedback.createdAt).getFullYear()}`}
    >
      <FeedbackDetails
        feedback={positiveFeedback || negativeFeedback}
        monthlyFeedback={monthlyFeedback}
        sign={positiveFeedback ? "positive" : "negative"}
      />
      <EditButton onClick={handleOpen} />
      <ModalContainer handleClose={handleClose} open={open}>
        <MonthlyFeedbackForm
          monthlyFeedback={monthlyFeedback}
          handleClose={handleClose}
          teamMemberId={teamMemberId}
        />
      </ModalContainer>
    </CardContainer>
  );
};
