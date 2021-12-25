import React from "react";
import { Control, Controller } from "react-hook-form";

type TextFieldProps = {
  name: string;
  label: string;
  rules?: any;
  control: Control<any>;
  rows?: number;
  placeholder: string;
};

export const ControlledTextArea = ({
  name,
  label,
  rules,
  control,
  rows,
  placeholder,
}: TextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="mb-4">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor={name}
          >
            {label}
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-500"
            id={name}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            rows={rows || 5}
          />
          {error && (
            <span className="text-red-600 text-sm">This field is required</span>
          )}
        </div>
      )}
    />
  );
};
