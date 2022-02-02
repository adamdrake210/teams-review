import React, { ReactNode } from "react";

type ParagraphProps = {
  children: string | ReactNode;
};

export const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="text-xl font-extralight">{children}</p>;
};
