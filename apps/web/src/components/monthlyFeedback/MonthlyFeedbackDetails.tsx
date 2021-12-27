import React from "react";
import { useRouter } from "next/dist/client/router";

import { MonthlyFeedback } from "@prisma/client";
import { Months } from "@/types/types";
import { FEEDBACKS_EDIT } from "@/constants/routerConstants";
import { EditButton } from "@/components/ui/EditButton";

type MonthlyFeedbackDetailsProps = {
  monthlyFeedback: MonthlyFeedback;
};

export const MonthlyFeedbackDetails = ({
  monthlyFeedback,
}: MonthlyFeedbackDetailsProps) => {
  const router = useRouter();
  const handleMonthlyFeedbackUpdate = () => {
    router.push({
      pathname: `${FEEDBACKS_EDIT}${monthlyFeedback.feedbackId}`,
      query: { month: monthlyFeedback.month },
    });
  };

  return (
    <div className="flex justify-between mb-4">
      <div>
        <p className="text-xl font-extralight">
          {Months[monthlyFeedback.month]}
        </p>
        {monthlyFeedback.feedback ? (
          <p>{monthlyFeedback.feedback}</p>
        ) : (
          <p className="italic text-slate-400">
            No feedback written for this month yet.
          </p>
        )}
      </div>
      <EditButton onClick={handleMonthlyFeedbackUpdate} />
    </div>
  );
};
