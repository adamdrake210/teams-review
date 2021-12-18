import { User } from "next-auth";
import React from "react";

type MyTeamMembersProps = {
  user: {
    email?: string;
    name?: string;
    image?: string;
  };
};

export const MyTeamMembers = ({ user }: MyTeamMembersProps) => {
  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
};
