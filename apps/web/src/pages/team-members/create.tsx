import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import { TeamMemberForm } from "@/components/teamMember/TeamMemberForm";
import { Heading1 } from "@/components/ui/typography/Heading1";
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
      <Heading1>Create Team Member</Heading1>
      <TeamMemberForm />
    </Layout>
  );
}
