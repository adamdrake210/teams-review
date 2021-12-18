import React, { ReactNode } from "react";
import { Navigation } from "../navigation/Navigation";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navigation />
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        {children}
      </main>
    </div>
  );
};
