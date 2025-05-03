import { ParsedQuery } from "@/types/types";

export function parseQuery(query: {
  [key: string]: string | string[] | undefined;
}): ParsedQuery {
  const {
    username,
    theme = "light",
    border = "true",
    hide_title = "false",
    custom_title,
    animation = "true",
    animation_duration = "2s",
    logo = "true",
    logo_color,
    bars_width = "50",
    bar_color,
    text_color,
    show_stats = "false",
    gradient_start,
    gradient_end,
  } = query;

  const parsedBarWidth = Number(bars_width);
  const validBarWidth =
    isNaN(parsedBarWidth) || parsedBarWidth < 20 || parsedBarWidth > 100
      ? 50
      : parsedBarWidth;
  const validColor = (color: string | undefined) =>
    color && (color.startsWith("#") || color.startsWith("%23"))
      ? color
      : undefined;

  return {
    username: typeof username === "string" ? username : "",
    theme: typeof theme === "string" ? theme : "light",
    border: border === "true",
    hideTitle: hide_title === "true",
    customTitle: typeof custom_title === "string" ? custom_title : undefined,
    animation: animation === "true",
    animationDuration:
      typeof animation_duration === "string" ? animation_duration : "2s",
    logo: logo === "true",
    logoColor: typeof logo_color === "string" ? logo_color : undefined,
    barWidth: validBarWidth,
    barColor: validColor(typeof bar_color === "string" ? bar_color : undefined),
    textColor: validColor(
      typeof text_color === "string" ? text_color : undefined,
    ),
    showStats: show_stats === "true",
    gradientStart: validColor(
      typeof gradient_start === "string" ? gradient_start : undefined,
    ),
    gradientEnd: validColor(
      typeof gradient_end === "string" ? gradient_end : undefined,
    ),
  };
}
