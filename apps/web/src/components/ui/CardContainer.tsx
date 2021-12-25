import React, { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  headerText: string;
};

export const CardContainer = ({ children, headerText }: CardContainerProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl sm:w-3/4 mb-8 font-raleway">
      <header className="bg-slate-500 rounded-t-lg py-3 px-4 text-xl font-vollkorn text-white">
        {headerText}
      </header>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
};
