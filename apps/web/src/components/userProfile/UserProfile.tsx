import React from "react";
import { useQuery } from "react-query";
import { User } from "@prisma/client";
import Image from "next/image";

import { RQ_KEY_USER } from "@/constants/constants";
import { getUser } from "@/services/api/userApi";
import { Loading } from "../Loading";
import { Heading2 } from "../ui/typography/Heading2";
import { UserProfileForm } from "./UserProfileForm";
import { Paragraph } from "../ui/typography/Paragraph";

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
        <Image
          className="w-40 h-40 rounded-full self-center ring-2 ring-white"
          src={userData?.image}
          alt={userData.name}
          width={140}
          height={140}
        />
        <Paragraph>{userData?.email}</Paragraph>
        <Heading2 className="my-4">Update your info</Heading2>
        <UserProfileForm userData={userData} />
      </div>
    </Loading>
  );
};
