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
const DEFAULT_ANIMATION_DURATION = "2s";
const DEFAULT_PIE_RADIUS = 100;

/**
 * Renders the pie chart SVG
 */
function createPieChartSVG(
  data: LeetCodeData,
  theme: ThemeColors,
  options: {
    animation: boolean;
    animationDuration: string;
    border: boolean;
    textColor: string | undefined;
    font: string;
    easyColor?: string; // Made optional
    mediumColor?: string; // Made optional
    hardColor?: string; // Made optional
    showLabels?: boolean; // Made optional
    pieRadius?: number; // Made optional
    showLegend?: boolean; // Made optional
  },
): string {
  const {
    animation,
    animationDuration,
    border,
    textColor,
    font,
    easyColor,
    mediumColor,
    hardColor,
    showLabels = true, // Default to true if undefined
    pieRadius = DEFAULT_PIE_RADIUS, // Default to 100 if undefined
    showLegend = true, // Default to true if undefined
  } = options;
  const {
    backgroundColor,
    textColor: themeTextColor,
  } = textColor ? { ...theme, textColor } : theme;

  const centerX = SVG_WIDTH / 2;
  const centerY = SVG_HEIGHT / 2 - (showLegend ? 20 : 0); // Adjust center if legend is shown
  const totalSolved = data.easySolved + data.mediumSolved + data.hardSolved;

  if (totalSolved === 0) {
    return `
      <svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" style="font-family: '${font}', sans-serif; background-color: ${backgroundColor};">
        <text x="${centerX}" y="${centerY}" font-size="16" fill="${themeTextColor}" text-anchor="middle">No problems solved</text>
      </svg>
    `;
  }

  const segments = [
    { label: "Easy", solved: data.easySolved, color: easyColor || "#10B981" },
    { label: "Medium", solved: data.mediumSolved, color: mediumColor || "#F59E0B" },
    { label: "Hard", solved: data.hardSolved, color: hardColor || "#EF4444" },
  ];

  let startAngle = 0;
  const svgParts: string[] = [
    `<svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" style="font-family: '${font}', sans-serif; background-color: ${backgroundColor};${border ? `border:1px solid ${themeTextColor};border-radius:12px;` : ""}">`,
  ];

  // Render pie chart segments
  segments.forEach((segment, index) => {
    if (segment.solved === 0) return;

    const percentage = segment.solved / totalSolved;
    const sweepAngle = percentage * 360;
    const endAngle = startAngle + sweepAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = centerX + pieRadius * Math.cos(startRad);
    const y1 = centerY + pieRadius * Math.sin(startRad);
    const x2 = centerX + pieRadius * Math.cos(endRad);
    const y2 = centerY + pieRadius * Math.sin(endRad);
    const largeArcFlag = sweepAngle > 180 ? 1 : 0;

    const path = `
      <path d="M${centerX},${centerY} L${x1},${y1} A${pieRadius},${pieRadius} 0 ${largeArcFlag},1 ${x2},${y2} Z" fill="${segment.color}">
        ${animation ? `<animate attributeName="d" from="M${centerX},${centerY} L${x1},${y1} A${pieRadius},${pieRadius} 0 ${largeArcFlag},1 ${x1},${y1} Z" to="M${centerX},${centerY} L${x1},${y1} A${pieRadius},${pieRadius} 0 ${largeArcFlag},1 ${x2},${y2} Z" dur="${animationDuration}" fill="freeze"/>` : ""}
      </path>
    `;

    svgParts.push(path);

    // Label for the segment (if enabled)
    if (showLabels) {
      const labelAngle = startAngle + sweepAngle / 2;
      const labelRad = (labelAngle * Math.PI) / 180;
      const labelX = centerX + (pieRadius + 20) * Math.cos(labelRad);
      const labelY = centerY + (pieRadius + 20) * Math.sin(labelRad);
      const textAnchor = labelAngle > 90 && labelAngle < 270 ? "end" : "start";

      svgParts.push(`
        <text x="${labelX}" y="${labelY}" font-size="12" fill="${themeTextColor}" text-anchor="${textAnchor}">${segment.label}: ${segment.solved} (${(percentage * 100).toFixed(1)}%)</text>
      `);
    }

    startAngle = endAngle;
  });

  // Legend below the pie chart (if enabled)
  if (showLegend) {
    const legendY = SVG_HEIGHT - 30;
    segments.forEach((segment, index) => {
      const x = 50 + index * 150;
      svgParts.push(`
        <rect x="${x}" y="${legendY - 10}" width="20" height="10" fill="${segment.color}"/>
        <text x="${x + 25}" y="${legendY}" font-size="12" fill="${themeTextColor}">${segment.label}</text>
      `);
    });
  }

  if (animation) {
    svgParts.push(`
      <style>
        path {
          transform-origin: ${centerX}px ${centerY}px;
        }
      </style>
    `);
  }

  svgParts.push("</svg>");
  return svgParts.join("\n");
}

/**
 * Handles GET requests for the LeetCode stats pie chart
 */
async function handleGetRequest(
  username: string,
  res: ApiResponse,
  options: {
    theme: string;
    animation: boolean;
    animationDuration: string;
    border: boolean;
    textColor: string | undefined;
    font: string;
    easyColor?: string; // Made optional
    mediumColor?: string; // Made optional
    hardColor?: string; // Made optional
    showLabels?: boolean; // Made optional
    pieRadius?: number; // Made optional
    showLegend?: boolean; // Made optional
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
  const svgContent = createPieChartSVG(data, theme, options);
  const buffer = Buffer.from(svgContent, "utf-8");

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${username}-leetcode-stats-pie.svg"`,
  );
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).end(buffer);
}

/**
 * API handler for /api/pie/[username]
 */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = parseQuery(req.query);
  const { username } = query;

  if (!username) {
    return res.status(400).json({ error: "Username not provided" });
  }
  await handleGetRequest(username, res, query);
}