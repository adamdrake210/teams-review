import React from "react";
import { ErrorText } from "./ui/typography/ErrorText";

type Props = {
  error?: any;
  isLoading?: boolean;
  isError?: boolean;
  children?: any;
  loadingMessage?: string;
};

export const Loading = ({
  isLoading,
  loadingMessage,
  isError,
  error,
  children = null,
}: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="text-xl font-extralight text-green-700">
          {loadingMessage || "Loading..."}
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col w-full justify-center items-center">
        <ErrorText>
          There was a problem loading this request - {error && error.message}
        </ErrorText>
      </div>
    );
  }

  return children;
};
