import React, { ReactNode } from "react";

type Heading2Props = {
  children: string | ReactNode;
  className?: string;
};

export const Heading2 = ({ children, className, ...rest }: Heading2Props) => {
  return (
    <h2
      className={`text-2xl font-vollkorn text-zinc-700 md:text-3xl font-extralight mb-2 ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
};
