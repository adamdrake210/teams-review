import React from "react";
import { useQuery } from "react-query";
import { User } from "@prisma/client";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "../Loading";
import { Heading2 } from "../ui/typography/Heading2";
import { UserProfileForm } from "./UserProfileForm";

type UserProfileProps = {
  className?: string;
};

export const UserProfile = ({ className }: UserProfileProps) => {
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery<User>(RQ_KEY_USER, getUser);

  return (
    <Loading isLoading={isLoading} isError={isError} error={error}>
      <div className={className || ""}>
        <Heading2>Update your info</Heading2>
        <UserProfileForm userData={userData} />
      </div>
    </Loading>
  );
};
