import { fetchAbsolute } from "@/utils/apiHelpers";
import { User } from "@prisma/client";
import { API_ENDPOINTS } from "./apiConstants";

const { API_USER_GET, API_USER_UPDATE } = API_ENDPOINTS;

export async function getUser() {
  const response = await fetchAbsolute(API_USER_GET);

  return await response.json();
}

export async function updateUserRequest(updateUserRequestParams: User) {
  const response = await fetchAbsolute(API_USER_UPDATE, {
    body: JSON.stringify({ data: updateUserRequestParams }),
  });

  return await response.json();
}
