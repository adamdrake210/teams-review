import React from "react";

import { MonthlyFeedback } from "@prisma/client";
import { Months } from "@/types/types";
import FeedbackDetails from "./FeedbackDetails";
import { EditButton } from "@/components/ui/EditButton";
import { useOpen } from "@/utils/useOpen";
import { MonthlyFeedbackForm } from "./MonthlyFeedbackForm";
import ModalContainer from "../ui/ModalContainer";

type FeedbackDetailsRowProps = {
  mfb: MonthlyFeedback | string;
};

export const MonthlyFeedbackDetailsRow = ({ mfb }: FeedbackDetailsRowProps) => {
  const { open, handleClose, handleOpen } = useOpen();

  return (
    <div className="w-5/6">
      <p className="text-xl font-extralight">
        {
          Months[
            typeof mfb === "string" ? mfb : new Date(mfb.createdAt).getMonth()
          ]
        }
      </p>
      <div className="flex flex-col sm:flex-row sm:justify-between w-full">
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

        <EditButton onClick={handleOpen} />
        <ModalContainer handleClose={handleClose} open={open}>
          <MonthlyFeedbackForm
            monthlyFeedback={mfb}
            handleClose={handleClose}
          />
        </ModalContainer>
      </div>
    </div>
  );
};
