import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { MyTeams } from "@/components/MyTeams";

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
      user: session,
    },
  };
};

export default function TeamsPage() {
  return (
    <Layout title="Teams">
      <Heading1>Your Teams</Heading1>
      <MyTeams />
    </Layout>
  );
}
