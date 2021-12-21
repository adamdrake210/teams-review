import React, { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  headerText: string;
};

export const CardContainer = ({ children, headerText }: CardContainerProps) => {
  return (
    <div className="bg-white rounded-lg shadow-2xl sm:w-3/4">
      <header className="bg-gray-100 rounded-t-lg py-3 px-4 text-xl font-extralight">
        {headerText}
      </header>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
};
