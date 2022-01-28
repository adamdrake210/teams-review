import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { LOGIN } from "@/constants/routerConstants";
import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { TeamsForm } from "@/components/teams/TeamsForm";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return {
      redirect: {
        destination: LOGIN,
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

export default function CreateTeam() {
  return (
    <Layout title="Create Team">
      <Heading1>Create Team</Heading1>
      <TeamsForm />
    </Layout>
  );
}
