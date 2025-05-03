import { lightTheme } from "@/themes/light";
import { darkTheme } from "@/themes/dark";
import { transparentTheme } from "@/themes/transparent";
import { neonTheme } from "@/themes/neon";
import { pastelTheme } from "@/themes/pastel";
import { gradientTheme } from "@/themes/gradient";
import { ThemeColors } from "@/types/types";

export function getTheme(themeName: string): ThemeColors {
  switch (themeName) {
    case "dark":
      return darkTheme;
    case "transparent":
      return transparentTheme;
    case "neon":
      return neonTheme;
    case "pastel":
      return pastelTheme;
    case "gradient":
      return gradientTheme;
    default:
      return lightTheme;
  }
}
