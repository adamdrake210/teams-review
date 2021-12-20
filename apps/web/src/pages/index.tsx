import { GetServerSideProps } from "next";
import { useSession, getSession, signOut } from "next-auth/react";
import { TeamMember } from "@prisma/client";

import { Layout } from "../layout/Layout";
import { MyTeamMembers } from "../components/MyTeamMembers";
import prisma from "../lib/prisma";
import { MyInfo } from "../components/MyInfo";
import { Loading } from "../components/Loading";
import { Heading1 } from "../components/ui/typography/Heading1";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const teamMembers = await prisma.teamMember.findMany({
    where: {
      manager: {
        email: session.user.email,
      },
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

export default function TeamReview({ initialTeamMembers }: TeamReviewProps) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-96">
          <Heading1>
            Welcome to <span className="text-sky-400">Team Reviews</span>
          </Heading1>

          <p className="text-xl">
            A single place to keep all your team&apos;s feedback and performance
            reviews
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading1>Your Team&apos;s Dashboard</Heading1>
      <MyInfo />
      <MyTeamMembers user={session.user} teamMembers={initialTeamMembers} />
    </Layout>
  );
}
