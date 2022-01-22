import React from "react";
import { useRouter } from "next/dist/client/router";

import { MonthlyFeedback } from "@prisma/client";
import { Months } from "@/types/types";
import { FEEDBACKS_EDIT } from "@/constants/routerConstants";
import { EditButton } from "@/components/ui/EditButton";
import { Heading4 } from "../ui/typography/Heading4";

type MonthlyFeedbackDetailsProps = {
  monthlyFeedback: MonthlyFeedback;
};

export const MonthlyFeedbackDetails = ({
  monthlyFeedback,
}: MonthlyFeedbackDetailsProps) => {
  const router = useRouter();
  const handleMonthlyFeedbackUpdate = () => {
    router.push({
      pathname: `${FEEDBACKS_EDIT}${monthlyFeedback.id}`,
      // query: { month: monthlyFeedback.month },
    });
  };

  return (
    <div className="flex justify-between mb-4">
      <div className="w-5/6">
        <p className="text-xl font-extralight">
          {Months[new Date(monthlyFeedback.createdAt).getMonth()]}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between w-full">
          <div className="flex flex-col sm:basis-1/2">
            <Heading4>Postive Feedback</Heading4>
            {monthlyFeedback.positiveFeedback ? (
              <p>{monthlyFeedback.positiveFeedback}</p>
            ) : (
              <p className="italic text-slate-400">
                No positive feedback written for this month yet.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:basis-1/2">
            <Heading4>Negative Feedback</Heading4>
            {monthlyFeedback.negativeFeedback ? (
              <p>{monthlyFeedback.negativeFeedback}</p>
            ) : (
              <p className="italic text-slate-400">
                No negative feedback written for this month yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <EditButton onClick={handleMonthlyFeedbackUpdate} />
    </div>
  );
};
