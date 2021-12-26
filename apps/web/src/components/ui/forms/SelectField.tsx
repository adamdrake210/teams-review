import { User } from "@prisma/client";
import React from "react";
import { Control, Controller } from "react-hook-form";

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
    <div className="flex">
      <div className="mb-3 w-full">
        <label className="block text-gray-700 text-md font-bold" htmlFor={name}>
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue={""}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <select
              className="form-select
          cursor-pointer
      appearance-none
      shadow
      block
      w-full
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      mb-4
      mt-2
      p-2
      focus:text-gray-700 focus:bg-white focus:border-green-500 focus:outline-none focus:shadow-outline"
              aria-label={label}
              onChange={onChange}
              value={value}
            >
              <option value="">Select a Team</option>
              {data.map((team) => {
                return (
                  <option key={team.id} value={team.id}>
                    {team.title}
                  </option>
                );
              })}
            </select>
          )}
        />
      </div>
    </div>
  );
};
