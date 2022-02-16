import React, { ReactNode } from "react";
import Head from "next/head";

import { COMPANY_NAME } from "@/constants/constants";
import { Footer } from "@/components/Footer";
import NewNavigation from "@/components/navigation/NewNavigation";

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
      <NewNavigation />
      <main className="flex flex-col font-raleway p-4 mx-auto container">
        {children}
      </main>
      <Footer />
    </div>
  );
};
