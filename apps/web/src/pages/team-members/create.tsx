import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Typography } from "@mui/material";

import { TeamMemberForm } from "@/components/teamMember/TeamMemberForm";
import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";

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

export default function CreateTeamMember() {
  return (
    <Layout title="Create Team Member">
      <Typography component="h1" variant="h3">
        Create Team Member
      </Typography>
      <TeamMemberForm />
    </Layout>
  );
}
