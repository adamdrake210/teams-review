import React from "react";
import { Team, TeamMember, User } from "@prisma/client";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "@/components/Loading";
import { CardContainer } from "@/components/ui/CardContainer";
import { pluralHelper } from "@/utils/pluralHelper";

export const MyInfo = () => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<User & { employees: TeamMember[]; teams: Team[] }>(
    RQ_KEY_USER,
    getUser
  );

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div>
        <Typography component="h2" variant="h4" gutterBottom>
          Team Info
        </Typography>
        <CardContainer
          headerText={`Welcome back ${userData?.firstName || userData?.name}!`}
        >
          {userData && (
            <>
              <Typography variant="subtitle1">
                You have {userData.employees.length} employee
                {pluralHelper(userData.employees)}.
              </Typography>
              <Typography variant="subtitle1">
                You have {userData.teams.length} team
                {pluralHelper(userData.teams)}.
              </Typography>
            </>
          )}
        </CardContainer>
      </div>
    </Loading>
  );
};
