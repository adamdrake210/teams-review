import React from "react";
import { Control, Controller } from "react-hook-form";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";

type SelectFieldProps = {
  name: string;
  label: string;
  control: Control<any>;
  data: any[];
};

export const SelectField = ({
  name,
  label,
  control,
  data,
}: SelectFieldProps) => {
  return (
    <Box sx={{ my: 2, minWidth: 250, position: "relative" }}>
      <InputLabel id="action-type-select-label">{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Select
            labelId="action-type-select-label"
            id="action-type-select"
            value={value}
            error={!!error}
            onChange={onChange}
            sx={{ minWidth: 300 }}
          >
            {data?.length &&
              data.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.title}
                </MenuItem>
              ))}
          </Select>
        )}
      />
    </Box>
  );
};
