import React, { useEffect, useState } from "react";

import { MonthlyFeedback } from "@prisma/client";
import { Months } from "@/types/types";
import { MonthlyFeedbackDetailsRow } from "./MonthlyFeedbackDetailsRow";

type MonthlyFeedbackDetailsProps = {
  monthlyFeedback: MonthlyFeedback[];
};

export const MonthlyFeedbackDetails = ({
  monthlyFeedback,
}: MonthlyFeedbackDetailsProps) => {
  const [filteredMonthlyFeedback, setFilteredMonthlyFeedback] = useState<
    Array<MonthlyFeedback | string>
  >([]);

  useEffect(() => {
    // Combining the months array and monthly feedback array from the db to creat
    // one array which can be used for rendering the ui.
    const newMonthsArray = Object.keys(Months)
      .slice(0, 12)
      .map((month) => {
        const newMfb = monthlyFeedback?.map((mfb) => {
          if (month === String(new Date(mfb.createdAt).getMonth())) {
            return mfb;
          } else {
            return month;
          }
        });

        return newMfb.reduce(function (a, b) {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, []);
      });

    const finalFilteredMonthFeedback = newMonthsArray.map((arr) => {
      if (arr.length > 1) {
        return arr.filter((x) => typeof x !== "string");
      }
      return arr;
    });

    setFilteredMonthlyFeedback(finalFilteredMonthFeedback.flat(1));
  }, [monthlyFeedback]);

  return (
    <>
      {filteredMonthlyFeedback?.map((mfb) => {
        return (
          <div
            className="flex justify-between mb-4"
            key={typeof mfb === "string" ? mfb : mfb.id}
          >
            <MonthlyFeedbackDetailsRow mfb={mfb} />
          </div>
        );
      })}
    </>
  );
};
