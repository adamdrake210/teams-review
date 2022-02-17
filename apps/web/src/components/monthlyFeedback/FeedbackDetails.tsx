import React, { memo } from "react";
import { MonthlyFeedback } from "@prisma/client";
import { Typography } from "@mui/material";

type FeedbackDetailsProps = {
  feedback: string;
  monthlyFeedback: MonthlyFeedback | string;
  sign: "positive" | "negative";
};

const FeedbackDetails = ({
  monthlyFeedback,
  sign,
  feedback,
}: FeedbackDetailsProps) => {
  return (
    <div className="flex flex-col sm:basis-1/2">
      <Typography
        component="h4"
        variant="h5"
        sx={{ textTransform: "capitalize" }}
      >{`${sign} Feedback`}</Typography>
      {typeof monthlyFeedback !== "string" && feedback.length > 0 ? (
        <p>{feedback}</p>
      ) : (
        <p className="italic text-slate-400">
          {`No ${sign} feedback written for this month yet`}
        </p>
      )}
    </div>
  );
};

export default memo(FeedbackDetails);
