import React, { memo } from "react";
import { MonthlyFeedback } from "@prisma/client";
import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

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
    <Box sx={{ display: "flex", flexDirection: "column", flexBasis: "50%" }}>
      <Typography
        component="h4"
        variant="h5"
        sx={{ textTransform: "capitalize" }}
      >{`${sign} Feedback`}</Typography>
      {typeof monthlyFeedback !== "string" && feedback.length > 0 ? (
        <Typography variant="body1">{feedback}</Typography>
      ) : (
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", color: grey[400] }}
        >
          {`No ${sign} feedback written for this month yet`}
        </Typography>
      )}
    </Box>
  );
};

export default memo(FeedbackDetails);
