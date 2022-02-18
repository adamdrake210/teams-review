import { Typography } from "@mui/material";
import React, { useEffect } from "react";

type SuccessTextProps = {
  message: string;
  handleShowingMessage: (arg: boolean) => void;
};

export const SuccessText = ({
  message,
  handleShowingMessage,
}: SuccessTextProps) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      handleShowingMessage(false);
    }, 4000);

    return () => {
      clearTimeout(timeId);
    };
  }, [handleShowingMessage]);

  return (
    <Typography component="p" variant="body2" color="success">
      {message}
    </Typography>
  );
};
