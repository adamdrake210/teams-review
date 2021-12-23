import React from "react";
import { MonthlyFeedback } from "@prisma/client";

import { Button } from "./ui/Button";
import { Months } from "@/types/types";
import { useRouter } from "next/dist/client/router";
import { FEEDBACKS_EDIT } from "@/constants/routerConstants";

type MonthlyFeedbackDetailsProps = {
  monthlyFeedback: MonthlyFeedback;
};

export const MonthlyFeedbackDetails = ({
  monthlyFeedback,
}: MonthlyFeedbackDetailsProps) => {
  const router = useRouter();
  const handleMonthlyFeedbackUpdate = () => {
    console.log(monthlyFeedback);
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
          "No feedback written for this month yet."
        )}
      </div>
      <Button
        className="mt-4"
        btnText={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        }
        color="primary"
        onClick={handleMonthlyFeedbackUpdate}
      />
    </div>
  );
};
