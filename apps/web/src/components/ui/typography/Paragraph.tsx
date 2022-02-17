import { Typography } from "@mui/material";
import React, { ReactNode } from "react";

type ParagraphProps = {
  children: string | ReactNode;
};

export const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <Typography component="p" variant="body2">
      {children}
    </Typography>
  );
};
