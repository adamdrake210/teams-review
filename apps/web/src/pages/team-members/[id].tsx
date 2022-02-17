import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { MonthlyFeedback, Team, TeamMember } from "@prisma/client";
import prisma from "@/lib/prisma";
import { Typography } from "@mui/material";

import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";
import { TeamMemberDetails } from "@/components/teamMember/TeamMemberDetails";
import { TeamMemberFeedback } from "@/components/teamMember/TeamMemberFeedback";

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
    include: {
      team: true,
      monthlyFeedback: true,
    },
  });

  return {
    props: {
      user: session,
      teamMember: JSON.parse(JSON.stringify(teamMember)),
    },
  };
};

export type TeamMemberProps = {
  teamMember: TeamMember & { team: Team; monthlyFeedback: MonthlyFeedback[] };
};

export default function TeamMemberDetailsPage({ teamMember }: TeamMemberProps) {
  return (
    <Layout title="Team Member">
      {teamMember ? (
        <>
          <Typography component="h1" variant="h3">
            Details for {teamMember.firstName} {teamMember.lastName}
          </Typography>
          <TeamMemberDetails teamMember={teamMember} />
          <TeamMemberFeedback teamMember={teamMember} />
        </>
      ) : (
        <Typography component="h1" variant="h3">
          No Team Member found
        </Typography>
      )}
    </Layout>
  );
}
