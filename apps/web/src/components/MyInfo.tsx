import React from "react";
import { useQuery } from "react-query";
import { getUser } from "../services/api/userApi";

export const MyInfo = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    "me",
    getUser
  );

  return (
    <div>
      <h2 className="font-extralight">My Info</h2>
      {data && console.log("data: ", data)}
    </div>
  );
};
