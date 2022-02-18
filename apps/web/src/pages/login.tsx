import React from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Typography } from "@mui/material";

import { HOME } from "@/constants/routerConstants";
import { Layout } from "@/layout/Layout";
import { COMPANY_NAME } from "@/constants/constants";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }

  return {
    redirect: {
      destination: HOME,
      permanent: false,
    },
  };
};

export default function Login() {
  return (
    <Layout title="Welcome!">
      <div className="flex flex-col items-center justify-center h-96">
        <Typography component="h1" variant="h3">
          Welcome to{" "}
          <span className="text-green-500 uppercase">{COMPANY_NAME}</span>
        </Typography>

        <p className="text-xl text-center">
          A single place to keep all your team&apos;s feedback and performance
          reviews
        </p>
      </div>
    </Layout>
  );
}
