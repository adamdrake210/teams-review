import { TeamMember } from "@prisma/client";
import { fetchAbsolute } from "../../utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const {
  API_TEAM_MEMBER_CREATE,
  API_TEAM_MEMBER_UPDATE,
  API_TEAM_MEMBER_DELETE,
} = API_ENDPOINTS;

export async function createTeamMemberRequest(
  createTeamMembersRequestParams: TeamMember
) {
  const response = await fetchAbsolute(API_TEAM_MEMBER_CREATE, {
    body: JSON.stringify({ data: createTeamMembersRequestParams }),
  });
  return await response.json();
}

export async function updateTeamMemberRequest(
  updateTeamMembersRequestParams: TeamMember
) {
  const response = await fetchAbsolute(API_TEAM_MEMBER_UPDATE, {
    body: JSON.stringify({ data: updateTeamMembersRequestParams }),
  });
  return await response.json();
}

type DeleteTeamMemberRequestParamsType = {
  teamMemberId: string;
};

export async function deleteTeamMemberRequest(
  deleteTeamMemberRequestParams: DeleteTeamMemberRequestParamsType
) {
  const response = await fetchAbsolute(API_TEAM_MEMBER_DELETE, {
    body: JSON.stringify({ data: deleteTeamMemberRequestParams }),
  });
  return await response.json();
}
