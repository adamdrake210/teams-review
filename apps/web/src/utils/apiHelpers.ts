export async function fetchAbsolute(url: string, options) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_ENDPOINT + url,
      options
    );
    return response;
  } catch (error) {
    console.error("Mokey!!", error);
    throw new Error(error);
  }
}
