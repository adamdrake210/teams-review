import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { TeamMember } from "@prisma/client";
import { Grid, Typography } from "@mui/material";

import { Layout } from "@/layout/Layout";
import { MyTeamMembers } from "@/components/MyTeamMembers";
import prisma from "@/lib/prisma";
import { MyInfo } from "@/components/MyInfo";
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
      <Typography component="h1" variant="h3">
        Your Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <MyTeamMembers teamMembers={initialTeamMembers} />
        </Grid>
        <Grid item xs={4}>
          <MyInfo className="flex-1 sm:basis-1/3" />
        </Grid>
      </Grid>

      <LatestMonthlyFeedback />
    </Layout>
  );
}
