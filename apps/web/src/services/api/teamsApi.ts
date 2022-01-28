import { Team } from "@prisma/client";
import { fetchAbsolute } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_TEAMS_GET, API_TEAMS_CREATE, API_TEAMS_UPDATE, API_TEAMS_DELETE } =
  API_ENDPOINTS;

export async function getTeams() {
  const response = await fetchAbsolute(API_TEAMS_GET);
  return await response.json();
}

type CreateTeamRequestType = {
  title: Team["title"];
  description: Team["description"];
};

export async function createTeamsRequest(
  createTeamsParams: CreateTeamRequestType
) {
  const response = await fetchAbsolute(API_TEAMS_CREATE, {
    body: JSON.stringify({ data: createTeamsParams }),
  });

  return await response.json();
}

export async function updateTeamsRequest(updateTeamsParams: Partial<Team>) {
  const response = await fetchAbsolute(API_TEAMS_UPDATE, {
    body: JSON.stringify({ data: updateTeamsParams }),
  });

  return await response.json();
}

type DeleteTeamsRequestParamsType = {
  teamId: Team["id"];
};

export async function deleteTeamsRequest(
  deleteTeamsParams: DeleteTeamsRequestParamsType
) {
  const response = await fetchAbsolute(API_TEAMS_DELETE, {
    body: JSON.stringify({ data: deleteTeamsParams }),
  });

  return await response.json();
}
