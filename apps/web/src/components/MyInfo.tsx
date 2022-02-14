import React from "react";
import { Team, TeamMember, User } from "@prisma/client";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "@/components/Loading";
import { CardContainer } from "@/components/ui/CardContainer";
import { Paragraph } from "@/components/ui/typography/Paragraph";
import { pluralHelper } from "@/utils/pluralHelper";

type MyInfoProps = {
  className?: string;
};

export const MyInfo = ({ className }: MyInfoProps) => {
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
      <div className={className || ""}>
        <Typography component="h2" variant="h4">
          Team Info
        </Typography>
        <CardContainer
          headerText={`Welcome back ${userData?.firstName || userData?.name}!`}
        >
          {userData && (
            <>
              <Paragraph>
                You have {userData.employees.length} employee
                {pluralHelper(userData.employees)}.
              </Paragraph>
              <Paragraph>
                You have {userData.teams.length} team
                {pluralHelper(userData.teams)}.
              </Paragraph>
            </>
          )}
        </CardContainer>
      </div>
    </Loading>
  );
};
