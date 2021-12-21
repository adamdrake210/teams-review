import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

import { Heading1 } from "@/components/ui/typography/Heading1";
import { HOME } from "@/constants/routerConstants";
import { Layout } from "@/layout/Layout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }

  return {
    redirect: {
      destination: HOME,
      permanent: false,
    },
  };
};

export default function Login() {
  return (
    <Layout title="Welcome!">
      <div className="flex flex-col items-center justify-center h-96">
        <Heading1>
          Welcome to <span className="text-sky-400">Team Reviews</span>
        </Heading1>

        <p className="text-xl text-center">
          A single place to keep all your team&apos;s feedback and performance
          reviews
        </p>
      </div>
    </Layout>
  );
}
