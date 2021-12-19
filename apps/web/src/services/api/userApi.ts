export async function getUser() {
  const response = await fetch("api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}
