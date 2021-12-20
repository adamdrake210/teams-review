import React, { ReactNode } from "react";
import Head from "next/head";

import { Navigation } from "../components/navigation/Navigation";

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title} | Feedback</title>
      </Head>
      <Navigation />
      <main className="flex flex-col min-h-screen py-4 mx-auto container">
        {children}
      </main>
    </div>
  );
};
