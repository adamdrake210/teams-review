import React, { ReactNode } from "react";

type ErrorTextProps = {
  children: ReactNode;
};

export const ErrorText = ({ children }: ErrorTextProps) => {
  return <p className="text-lg font-extralight text-red-700">{children}</p>;
};
