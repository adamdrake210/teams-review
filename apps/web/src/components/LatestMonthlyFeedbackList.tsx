import React from "react";

import { MonthlyFeedback } from "@prisma/client";
import { MonthlyFeedbackCard } from "./monthlyFeedback/MonthlyFeedbackCard";
import { Heading3 } from "./ui/typography/Heading3";
import { Paragraph } from "./ui/typography/Paragraph";

type LatestFeedback = {
  firstName: string;
  lastName: string;
  feedback: Array<{
    monthlyFeedback: MonthlyFeedback[];
    yearOfFeedback: number;
  }>;
};

type LatestMonthlyFeedbackListProps = {
  monthlyFeedbacks: Array<LatestFeedback>;
};

export const LatestMonthlyFeedbackList = ({
  monthlyFeedbacks,
}: LatestMonthlyFeedbackListProps) => {
  return (
    <div className="flex flex-col">
      {monthlyFeedbacks?.length > 0 ? (
        monthlyFeedbacks.map((mfb, i) => {
          return (
            <div key={`${i}${mfb.firstName}`} className="flex flex-col">
              <Heading3>
                {mfb.firstName} {mfb.lastName}
              </Heading3>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                {mfb?.feedback[0]?.monthlyFeedback?.map((fb, i) => {
                  if (fb.positiveFeedback.length > 0) {
                    return (
                      <MonthlyFeedbackCard
                        key={`${fb.feedbackId}${i}`}
                        feedback={fb}
                        yearOfFeedback={mfb.feedback[0].yearOfFeedback}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        })
      ) : (
        <Paragraph>Currently you haven&apos;t written any feedback.</Paragraph>
      )}
    </div>
  );
};
