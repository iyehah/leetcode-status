/**
 * Fetches LeetCode data for a given username using the API URL from environment variables.
 * @param username - The LeetCode username.
 * @returns LeetCode data or null if the request fails.
 */
export const fetchLeetCodeData = async (username: string) => {
  const apiUrl = process.env.LEETCODE_API_URL;

  if (!apiUrl) {
    console.error("Environment variable LEETCODE_API_URL is not set");
    throw new Error("LeetCode API URL is not configured");
  }

  try {
    const response = await fetch(`${apiUrl}/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch LeetCode data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching LeetCode data for ${username}:`, error);
    return null;
  }
};
