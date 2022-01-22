import React from "react";

import { MonthlyFeedback } from "@prisma/client";
import { MonthlyFeedbackCard } from "./monthlyFeedback/MonthlyFeedbackCard";
import { Heading3 } from "./ui/typography/Heading3";
import { Paragraph } from "./ui/typography/Paragraph";

type UsersWithMonthlyFeedback = {
  firstName: string;
  lastName: string;
  monthlyFeedback: MonthlyFeedback[];
};

type LatestMonthlyFeedbackListProps = {
  users: Array<UsersWithMonthlyFeedback>;
};

export const LatestMonthlyFeedbackList = ({
  users,
}: LatestMonthlyFeedbackListProps) => {
  return (
    <div className="flex flex-col">
      {users?.length > 0 ? (
        users.map((user, i) => {
          return (
            <div key={`${i}${user.firstName}`} className="flex flex-col">
              <Heading3>
                {user.firstName} {user.lastName}
              </Heading3>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                {user?.monthlyFeedback.map((mfb, i) => {
                  if (
                    mfb.positiveFeedback.length > 0 ||
                    mfb.negativeFeedback.length > 0
                  ) {
                    return (
                      <MonthlyFeedbackCard
                        key={`${mfb.createdAt}${i}`}
                        feedback={mfb}
                        yearOfFeedback={new Date(mfb.createdAt).getFullYear()}
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
