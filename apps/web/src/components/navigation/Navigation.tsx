import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/Button";
import { useRouter } from "next/dist/client/router";
import {
  FEEDBACKS,
  HOME,
  TEAMS,
  TEAM_MEMBERS,
} from "../../constants/routerConstants";

const MenuItems = [
  // {
  //   label: "Team Members",
  //   url: TEAM_MEMBERS,
  //   active: false,
  // },
  {
    label: "Your Teams",
    url: TEAMS,
    active: false,
  },
  {
    label: "Feedbacks",
    url: FEEDBACKS,
    active: false,
  },
];

export const Navigation = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <nav className="bg-gray-100 left-0 right-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between p-3">
          <div className="flex space-x-4">
            <Link href={HOME} passHref>
              <span className="text-2xl md:text-3xl text-sky-400 font-extralight uppercase cursor-pointer mr-8">
                FeedBack
              </span>
            </Link>
            {/* Desktop Menu */}
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
          <div className="hidden md:flex space-x-4">
            {session?.user ? (
              <Button btnText="Logout" onClick={signOut} />
            ) : (
              <>
                <Button btnText="Login" onClick={signIn} />
                <Button btnText="Sign Up" onClick={signIn} color="primary" />
              </>
            )}
          </div>

          {/* Mobile Hamburger icon */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {showMenu && (
          <div className="flex flex-col">
            {MenuItems.map((item, index) => {
              return (
                <Link href={item.url} passHref key={index}>
                  <div
                    className={`text-xl uppercase hover:text-sky-600 hover:underline py-3 px-4 border-b-2 border-sky-400 ${
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
            <div className="flex justify-center py-2">
              {session?.user ? (
                <Button btnText="Logout" onClick={signOut} />
              ) : (
                <>
                  <Button btnText="Login" onClick={signIn} className="mr-4" />
                  <Button btnText="Sign Up" onClick={signIn} color="primary" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
