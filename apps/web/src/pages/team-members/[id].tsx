import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";
import prisma from "@/lib/prisma";
import { TeamMember } from "@prisma/client";

const returnSingleParam = (param: string | string[]) => {
  if (typeof param === "string") return param;
  return param[0];
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
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

  const teamMember = await prisma.teamMember.findUnique({
    where: {
      id: returnSingleParam(params?.id),
    },
  });

  return {
    props: {
      user: session,
      teamMember: JSON.parse(JSON.stringify(teamMember)),
    },
  };
};

type TeamMemberProps = {
  teamMember: TeamMember;
};

export default function TeamMemberDetails({ teamMember }: TeamMemberProps) {
  return (
    <Layout title="Team Member">
      <Heading1>Your Team&apos;s Dashboard</Heading1>
      <p>{teamMember.firstName}</p>
    </Layout>
  );
}
