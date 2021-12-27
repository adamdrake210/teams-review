import React, { ReactNode } from "react";

type Heading1Props = {
  children: string | ReactNode;
};

export const Heading4 = ({ children, ...rest }: Heading1Props) => {
  return (
    <h4
      className={`text-lg font-vollkorn text-zinc-700 md:text-xl font-extralight mb-1 ${rest}`}
    >
      {children}
    </h4>
  );
};
