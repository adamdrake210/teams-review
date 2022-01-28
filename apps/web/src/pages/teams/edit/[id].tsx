import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Team } from "@prisma/client";
import prisma from "@/lib/prisma";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";
import { returnSingleParam } from "@/utils/getSingleParam";
import { TeamsForm } from "@/components/teams/TeamsForm";

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

  const team = await prisma.team.findUnique({
    where: {
      id: returnSingleParam(params?.id),
    },
  });

  return {
    props: {
      user: session,
      team: JSON.parse(JSON.stringify(team)),
    },
  };
};

type TeamsEditPageProps = {
  team: Team;
};

export default function TeamsEditPage({ team }: TeamsEditPageProps) {
  return (
    <Layout title="Team">
      <Heading1>Edit Details for {team.title}</Heading1>
      <TeamsForm editTeams={team} />
    </Layout>
  );
}
