import { fetchLeetCodeData } from "@/utils/leetcode";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("fetchLeetCodeData", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    process.env.LEETCODE_API_URL = "https://leetcode-stats-api.herokuapp.com";
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.spyOn(console, 'error').mockRestore();
  });

  it("should fetch LeetCode data successfully", async () => {
    const mockData = {
      totalSolved: 100,
      totalEasy: 200,
      totalMedium: 300,
      totalHard: 100,
      easySolved: 50,
      mediumSolved: 40,
      hardSolved: 10,
      ranking: 5000,
      acceptanceRate: 0.75,
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const data = await fetchLeetCodeData("iyehah");
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://leetcode-stats-api.herokuapp.com/iyehah",
    );
  });

  it("should throw an error if LEETCODE_API_URL is not set", async () => {
    delete process.env.LEETCODE_API_URL;
    await expect(fetchLeetCodeData("iyehah")).rejects.toThrow(
      "LeetCode API URL is not configured",
    );
  });

  it("should return null on HTTP error", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));
    const data = await fetchLeetCodeData("iyehah");
    expect(data).toBeNull();
  });

  it("should return null on non-OK response", async () => {
    fetchMock.mockResponseOnce("", { status: 404 });
    const data = await fetchLeetCodeData("iyehah");
    expect(data).toBeNull();
  });
});