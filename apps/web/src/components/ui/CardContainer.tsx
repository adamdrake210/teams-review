import React, { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

type CardContainerProps = {
  children: ReactNode;
  headerText?: string;
};

export const CardContainer = ({ children, headerText }: CardContainerProps) => {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardHeader title={headerText} sx={{ pb: 0 }} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
