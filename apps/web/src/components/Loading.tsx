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
        {/* <CircularProgress size={25} color="primary" className={classes.loader} /> */}
        <p className="text-xl font-extralight">
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
