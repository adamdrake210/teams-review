import { Months } from "@/types/types";
import { MonthlyFeedback } from "@prisma/client";
import React from "react";
import { CardContainer } from "./ui/CardContainer";
import { Heading3 } from "./ui/typography/Heading3";
import { Paragraph } from "./ui/typography/paragraph";

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
              <div className="flex flex-row sm:space-x-4">
                {mfb?.feedback[0]?.monthlyFeedback?.map((fb) => {
                  if (fb.feedback.length > 0) {
                    return (
                      <CardContainer
                        key={fb.feedbackId}
                        className="flex-1 sm:basis-1/3"
                        headerText={`${Months[fb.month]} - ${
                          mfb.feedback[0].yearOfFeedback
                        }`}
                      >
                        <p>{fb.feedback}</p>
                      </CardContainer>
                    );
                  }
                })}
              </div>
            </div>
          );
        })
      ) : (
        <Paragraph>Currently no feedback exists</Paragraph>
      )}
    </div>
  );
};
