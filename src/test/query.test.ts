import { parseQuery } from "@/utils/query";

describe("parseQuery", () => {
  it("should parse query with default values", () => {
    const query = { username: "iyehah" };
    const result = parseQuery(query);
    expect(result).toEqual({
      username: "iyehah",
      theme: "light",
      border: true,
      hideTitle: false,
      customTitle: undefined,
      animation: true,
      animationDuration: "2s",
      logo: true,
      logoColor: undefined,
      barWidth: 50,
      barColor: undefined,
      textColor: undefined,
      showStats: false,
      gradientStart: undefined,
      gradientEnd: undefined,
    });
  });

  it("should parse custom query parameters", () => {
    const query = {
      username: "iyehah",
      theme: "gradient",
      border: "false",
      hide_title: "true",
      custom_title: "Iyehah Hacen",
      animation: "false",
      animation_duration: "3s",
      logo: "false",
      logo_color: "%23FF0000",
      bars_width: "80",
      bar_color: "%2300FF00",
      text_color: "%230000FF",
      show_stats: "true",
      gradient_start: "%23FFFF00",
      gradient_end: "%23FF00FF",
    };
    const result = parseQuery(query);
    expect(result).toEqual({
      username: "iyehah",
      theme: "gradient",
      border: false,
      hideTitle: true,
      customTitle: "Iyehah Hacen",
      animation: false,
      animationDuration: "3s",
      logo: false,
      logoColor: "%23FF0000",
      barWidth: 80,
      barColor: "%2300FF00",
      textColor: "%230000FF",
      showStats: true,
      gradientStart: "%23FFFF00",
      gradientEnd: "%23FF00FF",
    });
  });

  it("should handle invalid bar width", () => {
    const query = { username: "iyehah", bars_width: "invalid" };
    const result = parseQuery(query);
    expect(result.barWidth).toBe(50);
  });

  it("should handle missing username", () => {
    const query = {};
    const result = parseQuery(query);
    expect(result.username).toBe("");
  });
});
