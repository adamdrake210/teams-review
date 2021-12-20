import React from "react";
import { useQuery } from "react-query";

import { RQ_KEY_USER } from "../constants/constants";
import { getUser } from "../services/api/userApi";
import { Loading } from "./Loading";
import { Heading2 } from "./ui/typography/Heading2";

export const MyInfo = () => {
  const { data, isLoading, isError, error } = useQuery(RQ_KEY_USER, getUser);

  return (
    <div>
      <Heading2>My Info</Heading2>
      <Loading isLoading={isLoading} isError={isError} error={error}>
        {data && console.log("data: ", data)}
      </Loading>
    </div>
  );
};
