import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Typography } from "@mui/material";

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
      <Typography component="h1" variant="h3">
        Your Teams
      </Typography>
      <MyTeams />
    </Layout>
  );
}
