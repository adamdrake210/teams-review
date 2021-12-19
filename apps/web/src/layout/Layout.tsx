import React, { ReactNode } from "react";
import { Navigation } from "../components/navigation/Navigation";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col min-h-screen py-4 mx-auto container">
        {children}
      </main>
    </div>
  );
};
