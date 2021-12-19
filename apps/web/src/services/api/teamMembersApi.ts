import { TeamMember } from "@prisma/client";

export async function createTeamMembersRequest(
  createTeamMembersRequest: TeamMember
) {
  const response = await fetch("/api/team-members/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: createTeamMembersRequest }),
  });
  const data = await response.json();
  return data;
}
