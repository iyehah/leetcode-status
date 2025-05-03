import { getTheme } from "@/utils/theme";
import { lightTheme } from "@/themes/light";
import { darkTheme } from "@/themes/dark";
import { transparentTheme } from "@/themes/transparent";
import { neonTheme } from "@/themes/neon";
import { pastelTheme } from "@/themes/pastel";
import { gradientTheme } from "@/themes/gradient";

describe("getTheme", () => {
  it("should return light theme by default", () => {
    expect(getTheme("invalid")).toBe(lightTheme);
  });

  it("should return correct theme for each theme name", () => {
    expect(getTheme("light")).toBe(lightTheme);
    expect(getTheme("dark")).toBe(darkTheme);
    expect(getTheme("transparent")).toBe(transparentTheme);
    expect(getTheme("neon")).toBe(neonTheme);
    expect(getTheme("pastel")).toBe(pastelTheme);
    expect(getTheme("gradient")).toBe(gradientTheme);
  });
});
