import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Box, TextField } from "@mui/material";

type DatePickProps = {
  disabled?: boolean;
  startDate: Date;
  setStartDate: (arg: Date) => void;
};

export const DatePick = ({
  disabled,
  startDate,
  setStartDate,
}: DatePickProps) => {
  return (
    <Box sx={{ my: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date Joined"
          value={startDate}
          onChange={(newDate) => {
            setStartDate(newDate);
          }}
          disabled={disabled}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </Box>
  );
};
