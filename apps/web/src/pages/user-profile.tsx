import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { User } from "next-auth";
import { UserProfile } from "@/components/userProfile/UserProfile";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session?.user,
    },
  };
};

type UserProfilePageProps = {
  user: Pick<User, "name" | "email" | "image">;
};

export default function UserProfilePage({ user }: UserProfilePageProps) {
  return (
    <Layout title="Feedback">
      <Heading1>User Profile for {user?.name}</Heading1>
      <UserProfile />
    </Layout>
  );
}
