import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { TeamMember } from "@prisma/client";

import { Layout } from "../layout/Layout";
import { MyTeamMembers } from "../components/MyTeamMembers";
import prisma from "../lib/prisma";
import { MyInfo } from "../components/MyInfo";
import { Heading1 } from "../components/ui/typography/Heading1";
import { LatestMonthlyFeedback } from "@/components/LatestMonthlyFeedback";

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

  const teamMembers = await prisma.teamMember.findMany({
    where: {
      manager: {
        email: session.user.email,
      },
    },
    include: {
      team: true,
    },
  });

  return {
    props: {
      initialTeamMembers: JSON.parse(JSON.stringify(teamMembers)),
    },
  };
};

type TeamReviewProps = {
  initialTeamMembers: TeamMember[];
};

export default function UserDashboard({ initialTeamMembers }: TeamReviewProps) {
  return (
    <Layout title="Home">
      <Heading1>Your Dashboard</Heading1>
      <section className="flex flex-col-reverse sm:space-x-4 sm:flex-row">
        <MyTeamMembers
          teamMembers={initialTeamMembers}
          className="flex-1 sm:basis-2/3"
        />
        <MyInfo className="flex-1 sm:basis-1/3" />
      </section>
      <section className="flex flex-col w-full sm:space-x-4 sm:flex-row">
        <LatestMonthlyFeedback className="w-full" />
      </section>
    </Layout>
  );
}
