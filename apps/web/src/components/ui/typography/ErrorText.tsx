import React, { ReactNode } from "react";

type ErrorTextProps = {
  children: ReactNode;
};

export const ErrorText = ({ children }: ErrorTextProps) => {
  return <p className="text-md font-extralight text-red-500">{children}</p>;
};
