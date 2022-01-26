import React, { memo } from "react";
import { MonthlyFeedback } from "@prisma/client";
import { Heading4 } from "../ui/typography/Heading4";

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
      <Heading4 className="capitalize">{`${sign} Feedback`}</Heading4>
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
