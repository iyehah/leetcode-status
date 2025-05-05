import { fetchLeetCodeData } from "@/utils/leetcode";
import { getTheme } from "@/utils/theme";
import { parseQuery } from "@/utils/query";
import { Buffer } from 'buffer';
import {
  ApiRequest,
  ApiResponse,
  LeetCodeData,
  ThemeColors,
} from "@/types/types";

/**
 * Constants for SVG dimensions and defaults
 */
const SVG_WIDTH = 500;
const SVG_HEIGHT = 300;
const BAR_WIDTH = 50;
const BAR_SPACING = 40;
const MAX_BAR_HEIGHT = 200;
const DEFAULT_ANIMATION_DURATION = "2s";

/**
 * Renders the bar graph SVG
 */
// Add font parameter to the options and apply it to text elements
function createBarGraphSVG(
  data: LeetCodeData,
  theme: ThemeColors,
  options: {
    animation: boolean;
    animationDuration: string;
    border: boolean;
    barWidth: number;
    barColor: string | undefined;
    textColor: string | undefined;
    font: string; // New font parameter
  },
): string {
  const {
    animation,
    animationDuration,
    border,
    barWidth,
    barColor,
    textColor,
    font,
  } = options;
  const {
    backgroundColor,
    textColor: themeTextColor,
    gridLines,
  } = textColor ? { ...theme, textColor } : theme;

  const maxSolved = Math.max(
    data.easySolved,
    data.mediumSolved,
    data.hardSolved,
  );
  const scaleFactor = maxSolved ? MAX_BAR_HEIGHT / maxSolved : 1;
  const yAxisLabels = Array.from({ length: 4 }, (_, i) =>
    Math.round((maxSolved / 3) * i),
  );

  const barColors = barColor
    ? [barColor, barColor, barColor]
    : ["#10B981", "#F59E0B", "#EF4444"];

  const bars = [
    { label: "Easy", solved: data.easySolved, color: barColors[0] },
    { label: "Medium", solved: data.mediumSolved, color: barColors[1] },
    { label: "Hard", solved: data.hardSolved, color: barColors[2] },
  ];

  const barBorder = border
    ? `border:1px solid ${themeTextColor};border-radius:12px;`
    : "";

  const svgParts: string[] = [
    `<svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" style="font-family: '${font}', sans-serif; background-color: ${backgroundColor};${barBorder}">`,
    `<line x1="50" y1="${SVG_HEIGHT - 50}" x2="${SVG_WIDTH - 20}" y2="${SVG_HEIGHT - 50}" stroke="${themeTextColor}" stroke-width="2"/>`,
    `<line x1="50" y1="${SVG_HEIGHT - 50}" x2="50" y2="30" stroke="${themeTextColor}" stroke-width="2"/>`,
  ];

  // Grid lines and Y-axis labels
  svgParts.push(
    yAxisLabels
      .map(
        (label, i) => `
      <line x1="50" y1="${SVG_HEIGHT - 50 - label * scaleFactor}" x2="${SVG_WIDTH - 20}" y2="${SVG_HEIGHT - 50 - label * scaleFactor}" stroke="${gridLines}" stroke-width="0.5"/>
      <text x="20" y="${SVG_HEIGHT - 50 - label * scaleFactor}" font-size="12" fill="${themeTextColor}">${label}</text>
    `,
      )
      .join(""),
  );

  // Bars and labels
  bars.forEach((bar, index) => {
    const x = 100 + index * (barWidth + BAR_SPACING);
    const height = bar.solved * scaleFactor;
    const y = SVG_HEIGHT - 50 - height;

    svgParts.push(`
      <rect x="${x}" y="${y}" width="${barWidth}" height="${height}" fill="${bar.color}">
        ${animation ? `<animate attributeName="height" from="0" to="${height}" dur="${animationDuration}" fill="freeze"/>` : ""}
      </rect>
      <text x="${x + barWidth / 2}" y="${y - 10}" font-size="12" fill="${themeTextColor}" text-anchor="middle">${bar.solved}</text>
      <text x="${x + 10}" y="${SVG_HEIGHT - 30}" font-size="14" fill="${themeTextColor}">${bar.label}</text>
    `);
  });

  if (animation) {
    svgParts.push(`
      <style>
        rect {
          transform-origin: bottom;
        }
      </style>
    `);
  }

  svgParts.push("</svg>");
  return svgParts.join("\n");
}

/**
 * Handles GET requests for the LeetCode stats graph
 */
async function handleGetRequest(
  username: string,
  res: ApiResponse,
  options: {
    theme: string;
    animation: boolean;
    animationDuration: string;
    border: boolean;
    barWidth: number;
    barColor: string | undefined;
    textColor: string | undefined;
    font: string; // New font parameter
  },
) {
  const data: LeetCodeData = await fetchLeetCodeData(username);

  if (
    !data ||
    isNaN(data.easySolved) ||
    isNaN(data.mediumSolved) ||
    isNaN(data.hardSolved)
  ) {
    return res
      .status(500)
      .json({ error: "Failed to generate image: Invalid or incomplete data" });
  }

  const theme = getTheme(options.theme);
  const svgContent = createBarGraphSVG(data, theme, options);
  const buffer = Buffer.from(svgContent, "utf-8");

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${username}-leetcode-stats-graph.svg"`,
  );
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).end(buffer);
}

/**
 * API handler for /api/graph/[username]
 */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = parseQuery(req.query);
  const { username, font = 'Roboto' } = query; // Default to 'Roboto' if font is not provided

  if (!username) {
    return res.status(400).json({ error: "Username not provided" });
  }

  await handleGetRequest(username, res, { ...query, font });
}
