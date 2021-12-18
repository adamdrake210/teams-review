import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/Button";
import { useRouter } from "next/dist/client/router";
import { HOME, REVIEWS, TEAM_MEMBERS } from "../../constants/routerConstants";

const MenuItems = [
  {
    label: "Team Members",
    url: TEAM_MEMBERS,
    active: false,
  },
  {
    label: "Reviews",
    url: REVIEWS,
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
              <p className="text-3xl text-sky-400 font-bold uppercase cursor-pointer">
                Team Reviews
              </p>
            </Link>
            {session.user && (
              <div className="md:flex items-center space-x-1">
                {MenuItems.map((item, index) => {
                  console.log(item.url);
                  return (
                    <>
                      <Link href={item.url} passHref key={index}>
                        <div
                          className={`text-center border-secondary-500 cursor-pointer text-xl uppercase mr-4 ${
                            router.asPath === item.url
                              ? "text-grey-200"
                              : "text-sky-700"
                          }`}
                        >
                          <p className="text-secondary-300">{item.label}</p>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex space-x-4">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
              Login
            </button>
            <Button btnText="Sign Up" />
          </div>
        </div>
      </div>
    </nav>
  );
};
