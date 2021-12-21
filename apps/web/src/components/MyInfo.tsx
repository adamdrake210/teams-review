import React from "react";
import { User } from "@prisma/client";
import { useQuery } from "react-query";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "./Loading";
import { CardContainer } from "./ui/CardContainer";

export const MyInfo = () => {
  const { data, isLoading, isError, error } = useQuery<User>(
    RQ_KEY_USER,
    getUser
  );

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <CardContainer
        headerText={`Welcome back ${data?.firstName || data?.name}!`}
      >
        {data && (
          <p className="text-2xl font-extralight">
            You currently have {data.employees.length} employees!
          </p>
        )}
      </CardContainer>
    </Loading>
  );
};
