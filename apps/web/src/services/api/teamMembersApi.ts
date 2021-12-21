import { TeamMember } from "@prisma/client";
import { fetchAbsolute } from "../../utils/apiHelpers";

export async function createTeamMemberRequest(
  createTeamMembersRequestParams: TeamMember
) {
  const response = await fetchAbsolute("/api/team-members/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: createTeamMembersRequestParams }),
  });
  const data = await response.json();
  return data;
}

export async function updateTeamMemberRequest(
  updateTeamMembersRequestParams: TeamMember
) {
  const response = await fetchAbsolute("/api/team-members/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: updateTeamMembersRequestParams }),
  });
  const data = await response.json();
  return data;
}
