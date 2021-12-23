import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Feedback, MonthlyFeedback, Team, TeamMember } from "@prisma/client";
import prisma from "@/lib/prisma";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";
import { TeamMemberForm } from "@/components/TeamMemberForm";
import { returnSingleParam } from "@/utils/getSingleParam";
import { Months } from "@/types/types";
import { MonthlyFeedbackForm } from "@/components/MonthlyFeedbackForm";
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

  const feedback = await prisma.feedback.findUnique({
    where: {
      id: returnSingleParam(params?.id),
    },
    include: {
      teamMember: true,
      monthlyFeedback: {
        orderBy: {
          month: "asc",
        },
      },
    },
  });

  return {
    props: {
      user: session,
      feedback: JSON.parse(JSON.stringify(feedback)),
    },
  };
};

type FeedbackEditPageProps = {
  feedback: Feedback & {
    teamMember: TeamMember;
    monthlyFeedback: MonthlyFeedback[];
  };
};

export default function FeedbackEditPage({ feedback }: FeedbackEditPageProps) {
  const router = useRouter();
  const { month } = router.query;

  return (
    <Layout title="Team Member">
      <Heading1>
        Editing Feedback for {feedback.teamMember.firstName} -{" "}
        {Months[returnSingleParam(month)]} {feedback.yearOfFeedback}
      </Heading1>
      <MonthlyFeedbackForm
        monthlyFeedback={feedback.monthlyFeedback[returnSingleParam(month)]}
        teamMemberId={feedback.teamMemberId}
      />
    </Layout>
  );
}
