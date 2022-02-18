import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { MonthlyFeedback, TeamMember } from "@prisma/client";
import { Months } from "@/types/types";
import { MonthlyFeedbackDetailsRow } from "./MonthlyFeedbackDetailsRow";

type MonthlyFeedbackDetailsProps = {
  monthlyFeedback: MonthlyFeedback[];
  teamMemberId: TeamMember["id"];
};

export const MonthlyFeedbackDetails = ({
  monthlyFeedback,
  teamMemberId,
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
    <Grid container spacing={2}>
      {filteredMonthlyFeedback.length > 0
        ? filteredMonthlyFeedback.map((mfb) => {
            return (
              <MonthlyFeedbackDetailsRow
                key={typeof mfb === "string" ? mfb : mfb.id}
                mfb={mfb}
                teamMemberId={teamMemberId}
              />
            );
          })
        : Object.keys(Months)
            .slice(0, 12)
            .map((month) => {
              return (
                <MonthlyFeedbackDetailsRow
                  key={`${month}${teamMemberId}`}
                  mfb={month}
                  teamMemberId={teamMemberId}
                />
              );
            })}
    </Grid>
  );
};
