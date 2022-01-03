import React, { ReactNode, useEffect } from "react";

type SuccessTextProps = {
  message: string;
  handleShowingMessage: (arg: boolean) => void;
};

export const SuccessText = ({
  message,
  handleShowingMessage,
}: SuccessTextProps) => {
  useEffect(() => {
    const timeId = setTimeout(() => {
      handleShowingMessage(false);
    }, 4000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <p className="text-md font-extralight text-green-700 my-2">{message}</p>
  );
};
