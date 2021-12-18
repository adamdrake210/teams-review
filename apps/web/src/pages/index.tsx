import Link from "next/link";
import { GetServerSideProps } from "next";
import { useSession, getSession, signOut } from "next-auth/react";

import { Layout } from "../components/layout/Layout";
import { MyTeamMembers } from "../components/MyTeamMembers";
import prisma from "../lib/prisma";
import { TeamMember } from "@prisma/client";

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
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <Layout>
        <Link href="/api/auth/signin">
          <a data-active={"/signup"}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }
          a + a {
            margin-left: 1rem;
          }
          .right {
            margin-left: auto;
          }
          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-5xl font-bold">Homepage</h1>
      <MyTeamMembers user={session.user} teamMembers={initialTeamMembers} />
      <button onClick={() => signOut()}>Logout</button>
    </Layout>
  );
}
