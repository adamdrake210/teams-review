import React, { ReactNode } from "react";
import Head from "next/head";

import { Navigation } from "../components/navigation/Navigation";
import { COMPANY_NAME } from "@/constants/constants";

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>
          {title} | {COMPANY_NAME}
        </title>
      </Head>
      <Navigation />
      <main className="flex flex-col min-h-screen p-4 mx-auto container font-raleway">
        {children}
      </main>
    </div>
  );
};
