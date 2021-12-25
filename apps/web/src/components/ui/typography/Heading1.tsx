import React, { ReactNode } from "react";

type Heading1Props = {
  children: string | ReactNode;
  className?: string;
};

export const Heading1 = ({ children, className, ...rest }: Heading1Props) => {
  return (
    <h1
      className={`text-3xl font-vollkorn md:text-4xl font-extralight my-4 ${
        className || ""
      }`}
      {...rest}
    >
      {children}
    </h1>
  );
};
