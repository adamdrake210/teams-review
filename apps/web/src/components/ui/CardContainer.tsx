import React, { ReactNode } from "react";

type CardContainerProps = {
  children: ReactNode;
  headerText?: string;
  className?: string;
};

export const CardContainer = ({
  children,
  headerText,
  className,
}: CardContainerProps) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md mb-8 font-raleway ${
        className || ""
      }`}
    >
      <header className="bg-green-600 rounded-t-lg py-3 px-4 text-2xl font-vollkorn text-white">
        {headerText}
      </header>
      <div className="px-4 py-4">{children}</div>
    </div>
  );
};
