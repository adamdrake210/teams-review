import React from "react";

import { COMPANY_NAME } from "@/constants/constants";
import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",

        py: 2,
        backgroundColor: "primary.dark",
      }}
    >
      <Typography variant="subtitle2">
        &copy; {new Date().getFullYear()} - {COMPANY_NAME} s.r.o.
      </Typography>
    </Box>
  );
};
