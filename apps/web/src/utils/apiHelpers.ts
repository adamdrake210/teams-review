export async function fetchAbsolute(url: string, options) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_ENDPOINT + url,
    options
  );
  return response;
}
