import React, { ReactNode } from "react";

type Heading4Props = {
  children: string | ReactNode;
  className?: string;
};

export const Heading4 = ({ children, className, ...rest }: Heading4Props) => {
  return (
    <h2
      className={`text-lg font-vollkorn text-zinc-700 md:text-xl font-extralight mb-1 ${className}`}
      {...rest}
    >
      {children}
    </h2>
  );
};
