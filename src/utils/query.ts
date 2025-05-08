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
    font = "Roboto",
    easy_color,
    medium_color,
    hard_color,
    show_labels = "true",
    pie_radius = "100", 
    show_legend = "true",
  } = query;

  const parsedBarWidth = Number(bars_width);
  const validBarWidth =
    isNaN(parsedBarWidth) || parsedBarWidth < 20 || parsedBarWidth > 100
      ? 50
      : parsedBarWidth;

  const parsedPieRadius = Number(pie_radius);
  const validPieRadius =
    isNaN(parsedPieRadius) || parsedPieRadius < 50 || parsedPieRadius > 150
      ? 100
      : parsedPieRadius;

  const validColor = (color: string | undefined) =>
    color && (color.startsWith("#") || color.startsWith("%23"))
      ? color
      : undefined;

  return {
    username: typeof username === "string" ? username : "",
    theme: typeof theme === "string" ? theme : "light",
    border: border === "false",
    hideTitle: hide_title === "true",
    customTitle: typeof custom_title === "string" ? custom_title : undefined,
    animation: animation === "true",
    animationDuration:
      typeof animation_duration === "string" ? animation_duration : "2s",
    logo: logo === "true",
    logoColor: validColor(typeof logo_color === "string" ? logo_color : undefined),
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
    font: typeof font === "string" ? font : "Roboto",
    easyColor: validColor(typeof easy_color === "string" ? easy_color : undefined),
    mediumColor: validColor(typeof medium_color === "string" ? medium_color : undefined),
    hardColor: validColor(typeof hard_color === "string" ? hard_color : undefined),
    showLabels: show_labels === "true",
    pieRadius: validPieRadius,
    showLegend: show_legend === "true",
  };
}
