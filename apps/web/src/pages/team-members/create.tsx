import React from "react";
import { TeamMemberForm } from "../../components/TeamMemberForm";
import { Layout } from "../../layout/Layout";

export default function Create() {
  return (
    <Layout>
      <h1 className="text-5xl font-extralight">Create Team Member</h1>
      <TeamMemberForm />
    </Layout>
  );
}
