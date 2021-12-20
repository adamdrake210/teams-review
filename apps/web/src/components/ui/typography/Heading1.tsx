import React, { ReactNode } from "react";

type Heading1Props = {
  children: string | ReactNode;
};

export const Heading1 = ({ children, ...rest }: Heading1Props) => {
  return (
    <h1 className={`text-5xl font-extralight mb-2 ${rest}`}>{children}</h1>
  );
};
