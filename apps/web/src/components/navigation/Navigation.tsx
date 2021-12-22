import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/Button";
import { useRouter } from "next/dist/client/router";
import { FEEDBACKS, HOME, TEAM_MEMBERS } from "../../constants/routerConstants";

const MenuItems = [
  {
    label: "Team Members",
    url: TEAM_MEMBERS,
    active: false,
  },
  {
    label: "Reviews",
    url: FEEDBACKS,
    active: false,
  },
];

export const Navigation = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <nav className="bg-gray-100 left-0 right-0">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <Link href={HOME} passHref>
              <p className="text-2xl md:text-3xl text-sky-400 font-extralight uppercase cursor-pointer mr-8">
                FeedBack
              </p>
            </Link>
            {session?.user && (
              <div className="hidden md:flex items-center space-x-4">
                {MenuItems.map((item, index) => {
                  return (
                    <Link href={item.url} passHref key={index}>
                      <div
                        className={`text-center border-secondary-500 cursor-pointer text-xl uppercase hover:text-sky-600 hover:underline ${
                          router.asPath === item.url
                            ? "text-sky-600 underline"
                            : "text-sky-400"
                        }`}
                      >
                        <p className="text-secondary-300">{item.label}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            {session?.user ? (
              <Button btnText="Logout" onClick={signOut} />
            ) : (
              <>
                <Button btnText="Login" onClick={signIn} />
                <Button btnText="Sign Up" onClick={signIn} color="primary" />
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
