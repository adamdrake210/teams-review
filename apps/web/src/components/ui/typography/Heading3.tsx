import React, { ReactNode } from "react";

type Heading3Props = {
  children: string | ReactNode;
};

export const Heading3 = ({ children, ...rest }: Heading3Props) => {
  return (
    <h3
      className={`text-xl font-vollkorn text-zinc-700 md:text-2xl font-extralight mb-2 ${rest}`}
    >
      {children}
    </h3>
  );
};
