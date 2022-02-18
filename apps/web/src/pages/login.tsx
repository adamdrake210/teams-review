import React from "react";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Box, Typography } from "@mui/material";

import { HOME } from "@/constants/routerConstants";
import { Layout } from "@/layout/Layout";
import { COMPANY_NAME } from "@/constants/constants";
import { minHeight } from "@mui/system";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "90vh",
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom textAlign="center">
          Welcome to{" "}
          <span className="text-green-500 uppercase">{COMPANY_NAME}</span>
        </Typography>

        <Typography variant="subtitle1" textAlign="center">
          A single place to keep all your team&apos;s feedback and performance
          reviews
        </Typography>
      </Box>
    </Layout>
  );
}
