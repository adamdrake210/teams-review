import React from "react";

import { TeamMemberForm } from "../../components/TeamMemberForm";
import { Heading1 } from "../../components/ui/typography/Heading1";
import { Layout } from "../../layout/Layout";

export default function Create() {
  return (
    <Layout>
      <Heading1>Create Team Member</Heading1>
      <TeamMemberForm />
    </Layout>
  );
}
