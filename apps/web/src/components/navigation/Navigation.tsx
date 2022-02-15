import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { CustomButton } from "../ui/Button";
import { useRouter } from "next/dist/client/router";
import {
  MONTHLY_FEEDBACK,
  HOME,
  TEAMS,
  TEAM_MEMBERS,
  USER_PROFILE,
} from "../../constants/routerConstants";
import { Loading } from "../Loading";
import { NavDropDownMenu } from "./NavDropDownMenu";
import { Button } from "@mui/material";

const MenuItems = [
  // {
  //   label: "Team Members",
  //   url: TEAM_MEMBERS,
  //   active: false,
  // },
  {
    label: "Teams",
    url: TEAMS,
    active: false,
  },
  {
    label: "Feedbacks",
    url: MONTHLY_FEEDBACK,
    active: false,
  },
];

const MobileMenuItems = [
  ...MenuItems,
  {
    label: "Profile",
    url: USER_PROFILE,
    active: false,
  },
];

export const Navigation = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-slate-50 left-0 right-0 font-raleway shadow-md fixed z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between p-3">
          <div className="flex  items-center">
            <Link href={HOME} passHref>
              <span className="font-vollkorn text-3xl text-zinc-700 font-extrabold uppercase cursor-pointer mr-8">
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
                        className={`text-center border-secondary-500 cursor-pointer text-xl uppercase hover:text-green-600 hover:underline ${
                          router.asPath === item.url
                            ? "text-green-600 underline"
                            : "text-gray-500"
                        }`}
                      >
                        <p>{item.label}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="hidden md:flex space-x-4">
            {status === "loading" ? (
              <Loading />
            ) : session?.user ? (
              <NavDropDownMenu user={session.user} />
            ) : (
              <>
                <Button onClick={handleSignIn}>Login</Button>
                <Button variant="contained" onClick={handleSignIn}>
                  Sign Up
                </Button>
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
                  className="h-6 w-6 fill-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    className="fill-green-500"
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
            {session?.user &&
              MobileMenuItems.map((item, index) => {
                return (
                  <Link href={item.url} passHref key={index}>
                    <div
                      className={`text-xl uppercase hover:text-green-600 hover:underline py-3 px-4 ${
                        router.asPath === item.url
                          ? "text-green-600 underline"
                          : "text-gray-500"
                      }`}
                    >
                      <p className="text-secondary-300">{item.label}</p>
                    </div>
                  </Link>
                );
              })}
            <div className="flex justify-center py-2">
              {status === "loading" ? (
                <Loading />
              ) : session?.user ? (
                <Button onClick={handleSignOut}>Logout</Button>
              ) : (
                <>
                  <Button onClick={handleSignIn}>Login</Button>
                  <Button variant="contained" onClick={handleSignIn}>
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
