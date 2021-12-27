import React, { ReactNode } from "react";

type Heading1Props = {
  children: string | ReactNode;
};

export const Heading2 = ({ children, ...rest }: Heading1Props) => {
  return (
    <h2
      className={`text-2xl font-vollkorn text-zinc-700 md:text-3xl font-extralight mb-2 ${rest}`}
    >
      {children}
    </h2>
  );
};
