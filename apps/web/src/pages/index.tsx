import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, getSession, signOut } from "next-auth/react";

import { Button } from "ui";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const users = await prisma.user.findMany();

  return {
    props: {
      initialUsers: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default function Web({ initialUsers }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className="right">
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
      </div>
    );
  }

  return (
    <div>
      <h1>Homepage</h1>
      {initialUsers.map((user) => {
        return (
          <>
            <p key={user.id}>
              {user.firstName} - {user.email}
            </p>
          </>
        );
      })}
      <Button />
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
