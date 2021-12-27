type ApiDetails = {
  url: string;
  method: string;
};

export async function fetchAbsolute(apiDetails: ApiDetails, furtherOptions?) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + apiDetails.url,
      {
        method: apiDetails.method,
        headers: {
          "Content-Type": "application/json",
        },
        ...furtherOptions,
      }
    );
    return response;
  } catch (error) {
    console.error("Fetch Error: ", error);
    throw new Error(error);
  }
}
