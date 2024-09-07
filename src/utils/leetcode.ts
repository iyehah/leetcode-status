export const fetchLeetCodeData = async (username: string) => {
  try {
    const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);

    if (!response.ok) {
      throw new Error('Failed to fetch LeetCode data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return null;
  }
};
