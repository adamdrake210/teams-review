import React, { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  headerText: string;
};

export const CardContainer = ({ children, headerText }: CardContainerProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl mb-8 font-raleway">
      <header className="bg-green-600 rounded-t-lg py-3 px-4 text-2xl font-vollkorn text-white">
        {headerText}
      </header>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
};
