import React from "react";
import { TeamMember, User } from "@prisma/client";
import { useQuery } from "react-query";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "./Loading";
import { CardContainer } from "./ui/CardContainer";
import { Heading2 } from "./ui/typography/Heading2";

type MyInfoProps = {
  className: string;
};

export const MyInfo = ({ className }: MyInfoProps) => {
  const { data, isLoading, isError, error } = useQuery<
    User & { employees: TeamMember[] }
  >(RQ_KEY_USER, getUser);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className={className}>
        <Heading2>Team Info</Heading2>
        <CardContainer
          headerText={`Welcome back ${data?.firstName || data?.name}!`}
        >
          {data && (
            <p className="text-2xl font-extralight">
              You currently have {data.employees.length} employees!
            </p>
          )}
        </CardContainer>
      </div>
    </Loading>
  );
};
