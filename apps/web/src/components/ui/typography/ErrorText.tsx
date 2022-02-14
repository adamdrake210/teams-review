import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

type ErrorTextProps = {
  children: ReactNode;
};

export const ErrorText = ({ children }: ErrorTextProps) => {
  return (
    <Typography component="p" variant="body2" color="error">
      {children}
    </Typography>
  );
};
