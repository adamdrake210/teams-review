import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";

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

export default function Reviews() {
  return (
    <Layout title="Reviews">
      <Heading1>Reviews</Heading1>
    </Layout>
  );
}
