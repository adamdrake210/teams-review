import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Typography } from "@mui/material";

import { LOGIN } from "@/constants/routerConstants";
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
      <Typography component="h1" variant="h3">
        Create Team
      </Typography>
      <TeamsForm />
    </Layout>
  );
}
