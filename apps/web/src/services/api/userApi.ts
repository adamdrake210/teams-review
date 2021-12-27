import { fetchAbsolute } from "@/utils/apiHelpers";
import { API_ENDPOINTS } from "./apiConstants";

const { API_USER_GET } = API_ENDPOINTS;

export async function getUser() {
  const response = await fetchAbsolute(API_USER_GET);

  return await response.json();
}
