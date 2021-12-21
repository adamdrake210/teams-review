import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Team, TeamMember } from "@prisma/client";
import prisma from "@/lib/prisma";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { Layout } from "@/layout/Layout";
import { LOGIN } from "@/constants/routerConstants";
import { TeamMemberDetails } from "@/components/TeamMemberDetails";
import { TeamMemberForm } from "@/components/TeamMemberForm";

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
  teamMember: TeamMember & { team: Team };
};

export default function TeamMemberEditPage({ teamMember }: TeamMemberProps) {
  return (
    <Layout title="Team Member">
      <Heading1>
        Edit Details for {teamMember.firstName} {teamMember.lastName}
      </Heading1>
      <TeamMemberForm editTeamMember={teamMember} />
    </Layout>
  );
}
