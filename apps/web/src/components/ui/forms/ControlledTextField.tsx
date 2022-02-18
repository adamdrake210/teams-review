import React from "react";
import { Control, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

type TextFieldProps = {
  name: string;
  label: string;
  rules: any;
  control: Control<any>;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const ControlledTextField = ({
  name,
  label,
  rules,
  control,
  type,
  disabled,
  placeholder,
}: TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ my: 2, minWidth: 250 }}
          label={label}
          variant="outlined"
          fullWidth
          type={type}
          error={!!error}
          placeholder={placeholder}
          helperText={error ? error.message : null}
          value={field.value}
          disabled={disabled}
          onChange={field.onChange}
        />
      )}
    />
  );
};
