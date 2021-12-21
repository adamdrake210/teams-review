import { fetchAbsolute } from "../../utils/apiHelpers";

export async function getUser() {
  const response = await fetchAbsolute("/api/user/get-me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
