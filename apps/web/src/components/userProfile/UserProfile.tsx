import React from "react";
import { useQuery } from "react-query";
import { User } from "@prisma/client";
import { Avatar, Box, Typography } from "@mui/material";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "../Loading";
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
      <Box>
        <Box sx={{ my: 4 }}>
          <Avatar
            src={userData?.image}
            alt={userData?.name}
            sx={{ width: 120, height: 120, mb: 2 }}
          />

          <Typography variant="h5">{userData?.email}</Typography>
        </Box>

        <Typography component="h2" variant="h4">
          Update your info
        </Typography>
        <UserProfileForm userData={userData} />
      </Box>
    </Loading>
  );
};
