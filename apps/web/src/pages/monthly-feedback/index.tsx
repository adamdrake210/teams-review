import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Layout } from "@/layout/Layout";
import { Typography } from "@mui/material";

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

export default function FeedbacksPage() {
  return (
    <Layout title="Feedback">
      <Typography component="h1" variant="h3">
        Feedbacks
      </Typography>
    </Layout>
  );
}
