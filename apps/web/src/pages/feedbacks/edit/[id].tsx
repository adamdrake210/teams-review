import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { MonthlyFeedback, TeamMember } from "@prisma/client";
import prisma from "@/lib/prisma";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";
import { TeamMemberForm } from "@/components/teamMember/TeamMemberForm";
import { returnSingleParam } from "@/utils/getSingleParam";
import { Months } from "@/types/types";
import { MonthlyFeedbackForm } from "@/components/monthlyFeedback/MonthlyFeedbackForm";
import { useRouter } from "next/dist/client/router";

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

  const monthlyFeedback = await prisma.monthlyFeedback.findUnique({
    where: {
      id: returnSingleParam(params?.id),
    },
    include: {
      TeamMember: true,
    },
  });

  return {
    props: {
      user: session,
      monthlyFeedback: JSON.parse(JSON.stringify(monthlyFeedback)),
    },
  };
};

type FeedbackEditPageProps = {
  monthlyFeedback: MonthlyFeedback;
};

export default function FeedbackEditPage({
  monthlyFeedback,
}: FeedbackEditPageProps) {
  const month = new Date(monthlyFeedback.createdAt).getMonth();

  return (
    <Layout title="Team Member">
      <Heading1>
        {/* @ts-ignore - have to work out this type error */}
        Editing Feedback for {monthlyFeedback.TeamMember.firstName} -{" "}
        {Months[month]}
      </Heading1>
      <MonthlyFeedbackForm
        month={month}
        monthlyFeedback={monthlyFeedback}
        teamMemberId={monthlyFeedback.teamMemberId}
      />
    </Layout>
  );
}
