import React, { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

type CardContainerProps = {
  children: ReactNode;
  headerText?: string;
  action?: ReactNode;
};

export const CardContainer = ({
  children,
  headerText,
  action,
}: CardContainerProps) => {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardHeader title={headerText} sx={{ pb: 0 }} action={action} />
      <CardContent>{children}</CardContent>
    </Card>
  );
};
