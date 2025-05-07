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
const SVG_HEIGHT = 200;
const CIRCLE_RADIUS = 50;
const BAR_WIDTH = 0.35 * SVG_WIDTH;
const BAR_HEIGHT = 4;
const DEFAULT_ANIMATION_DURATION = "2s";

/**
 * Renders the gradient background if applicable
 */
function renderGradientBackground(
  theme: ThemeColors,
  gradientStart?: string,
  gradientEnd?: string,
): string {
  if (theme.backgroundColor !== "url(#gradient)") return "";

  const startColor = gradientStart || "#6366F1";
  const endColor = gradientEnd || "#A855F7";

  return `
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${startColor};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:${endColor};stop-opacity:1"/>
      </linearGradient>
    </defs>
  `;
}

/**
 * Renders the SVG title with optional logo
 */
function renderTitle(
  username: string,
  title: string,
  theme: ThemeColors,
  logo: boolean,
  logoColor: string | undefined,
  hideTitle: boolean,
): string {
  if (hideTitle) return "";

  const logoHeight = 28;
  const logoWidth = 40;
  const logoX = 20;
  const logoY = 14;
  const titleX = logo ? logoX + logoWidth + 10 : 20;
  const titleY = logoY/2 + logoHeight + 3;

  let logoSvg = "";
  if (logo) {
    const defaultColors = ["#B3B1B0", "#E7A41F", "#070706"];
    const isValidColor =
      logoColor && (logoColor.startsWith("#") || logoColor.startsWith("%23"));
    const [primaryColor, secondaryColor, tertiaryColor] =
      logoColor === "theme"
        ? [theme.textColor, theme.textColor, theme.textColor]
        : logoColor === "default" || !isValidColor
          ? defaultColors
          : [logoColor, logoColor, logoColor];

    logoSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="leetcode" x="${logoX}" y="${logoY}" width="${logoWidth}" height="${logoHeight}">
        <path fill="${primaryColor}" d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"></path>
        <path fill="${secondaryColor}" d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"></path>
        <path fill="${tertiaryColor}" d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"></path>
      </svg>
    `;
  }

  return `
    ${logoSvg}
    <text x="${titleX}" y="${titleY}" font-size="25" font-weight="bold" text-anchor="start" fill="${theme.textColor}">${title}</text>
  `;
}

/**
 * Renders the progress circle
 */
function renderProgressCircle(
  totalSolved: number,
  totalQuestions: number,
  theme: ThemeColors,
  animation: boolean,
  animationDuration: string,
): string {
  const centerX = 70;
  const centerY = 115;
  const circumference = 2 * Math.PI * CIRCLE_RADIUS;
  const progressPercentage = totalSolved / totalQuestions || 0;
  const progressArc = progressPercentage * circumference;

  return `
    <circle cx="${centerX}" cy="${centerY}" r="${CIRCLE_RADIUS}" fill="${theme.progressBackgroundColor}" stroke="${theme.progressBarBackgroundColor}" stroke-width="4"/>
    <circle cx="${centerX}" cy="${centerY}" r="${CIRCLE_RADIUS}" fill="none" stroke="${theme.progressBarFillColor}" stroke-width="4"
      stroke-dasharray="${progressArc} ${circumference}" stroke-linecap="round" transform="rotate(-90 ${centerX} ${centerY})"
      class="${animation ? "animated-progress" : ""}"/>
    <text x="${centerX}" y="${centerY + 8}" font-size="20" font-weight="bold" text-anchor="middle" fill="${theme.textColor}">${totalSolved}</text>
  `;
}

/**
 * Renders progress bars for Easy, Medium, Hard
 */
function renderProgressBars(
  data: LeetCodeData,
  theme: ThemeColors,
  animation: boolean,
  barColor: string | undefined,
  animationDuration: string,
): string {
  const bars = [
    {
      label: "Easy",
      solved: data.easySolved,
      total: data.totalEasy,
      color: barColor || "#10B981",
    },
    {
      label: "Medium",
      solved: data.mediumSolved,
      total: data.totalMedium,
      color: barColor || "#F59E0B",
    },
    {
      label: "Hard",
      solved: data.hardSolved,
      total: data.totalHard,
      color: barColor || "#EF4444",
    },
  ];

  return bars
    .map((bar, index) => {
      const barX = 220;
      const barY = 60 + index * 50;
      const filledWidth = Math.min(
        (bar.solved / bar.total) * BAR_WIDTH,
        BAR_WIDTH,
      );

      return `
      <text x="${barX - 70}" y="${barY + 10}" font-size="16" fill="${theme.textColor}">${bar.label}</text>
      <text x="${barX + BAR_WIDTH + 10}" y="${barY + 10}" font-size="16" fill="${theme.textColor}">${bar.solved} / ${bar.total}</text>
      <rect x="${barX}" y="${barY + 5}" width="${BAR_WIDTH}" height="${BAR_HEIGHT}" rx="3" ry="3" fill="${theme.progressBarBackgroundColor}"/>
      <rect x="${barX}" y="${barY + 5}" width="${isNaN(filledWidth) ? 0 : filledWidth}" height="${BAR_HEIGHT}" rx="3" ry="3" fill="${bar.color}" class="${animation ? "animated-bar" : ""}"/>
    `;
    })
    .join("");
}

/**
 * Renders additional stats (ranking, acceptance rate)
 */
function renderStats(
  data: LeetCodeData,
  theme: ThemeColors,
  showStats: boolean,
): string {
  if (!showStats || !data.ranking) return "";

  const statsX = 220;
  const statsY = 180;

  return `
    <text x="${statsX}" y="${statsY}" font-size="14" fill="${theme.textColor}">Rank: ${data.ranking}</text>
    ${data.acceptanceRate ? `<text x="${statsX}" y="${statsY + 20}" font-size="14" fill="${theme.textColor}">Acceptance: ${(data.acceptanceRate * 100).toFixed(1)}%</text>` : ""}
  `;
}

/**
 * Creates the SVG for the LeetCode stats card
 */
function createSVG(
  username: string,
  data: LeetCodeData,
  theme: ThemeColors,
  options: {
    border: boolean;
    hideTitle: boolean;
    customTitle: string | undefined;
    animation: boolean;
    animationDuration: string;
    logo: boolean;
    logoColor: string | undefined;
    barColor: string | undefined;
    textColor: string | undefined;
    showStats: boolean;
    gradientStart: string | undefined;
    gradientEnd: string | undefined;
    font: string; // New font parameter
  },
): string {
  const {
    border,
    hideTitle,
    customTitle,
    animation,
    animationDuration,
    logo,
    logoColor,
    barColor,
    textColor,
    showStats,
    gradientStart,
    gradientEnd,
    font,
  } = options;
  const title = customTitle || username;
  const totalQuestions = data.totalEasy + data.totalMedium + data.totalHard;
  const themeWithCustomText = textColor ? { ...theme, textColor } : theme;

  const svgParts: string[] = [
    `<svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" xmlns="http://www.w3.org/2000/svg" style="font-family: '${font}', sans-serif;">`,
    renderGradientBackground(themeWithCustomText, gradientStart, gradientEnd),
    `<rect x="0" y="0" width="${SVG_WIDTH}" height="${SVG_HEIGHT}" rx="20" ry="20" fill="${themeWithCustomText.backgroundColor}"/>`,
    border
      ? `<rect x="0" y="0" width="${SVG_WIDTH}" height="${SVG_HEIGHT}" rx="20" ry="20" fill="none" stroke="${themeWithCustomText.borderColor}" stroke-width="0.5"/>`
      : "",
    renderTitle(
      username,
      title,
      themeWithCustomText,
      logo,
      logoColor,
      hideTitle,
    ),
    renderProgressCircle(
      data.totalSolved,
      totalQuestions,
      themeWithCustomText,
      animation,
      animationDuration,
    ),
    renderProgressBars(
      data,
      themeWithCustomText,
      animation,
      barColor,
      animationDuration,
    ),
    renderStats(data, themeWithCustomText, showStats),
  ];

  if (animation) {
    svgParts.push(`
      <style>
        .animated-progress {
          animation: progressAnimation ${animationDuration} ease-in-out;
        }
        .animated-bar {
          animation: barAnimation ${animationDuration} ease-in-out;
        }
        @keyframes progressAnimation {
          from { stroke-dasharray: 0 ${2 * Math.PI * CIRCLE_RADIUS}; }
          to { stroke-dasharray: ${(data.totalSolved / totalQuestions || 0) * (2 * Math.PI * CIRCLE_RADIUS)} ${2 * Math.PI * CIRCLE_RADIUS}; }
        }
        @keyframes barAnimation {
          from { width: 0; }
          to { width: inherit; }
        }
      </style>
    `);
  }

  svgParts.push("</svg>");
  return svgParts.join("\n");
}

/**
 * Handles GET requests for the LeetCode stats card
 */
async function handleGetRequest(
  username: string,
  res: ApiResponse,
  options: {
    theme: string;
    border: boolean;
    hideTitle: boolean;
    customTitle: string | undefined;
    animation: boolean;
    animationDuration: string;
    logo: boolean;
    logoColor: string | undefined;
    barColor: string | undefined;
    textColor: string | undefined;
    showStats: boolean;
    gradientStart: string | undefined;
    gradientEnd: string | undefined;
    font: string; // New font parameter
  },
) {
  const data: LeetCodeData = await fetchLeetCodeData(username);

  if (
    !data ||
    isNaN(data.totalSolved) ||
    isNaN(data.totalEasy) ||
    isNaN(data.totalMedium) ||
    isNaN(data.totalHard)
  ) {
    return res
      .status(500)
      .json({ error: "Failed to generate image: Invalid or incomplete data" });
  }

  const theme = getTheme(options.theme);
  const svgContent = createSVG(username, data, theme, options);
  const buffer = Buffer.from(svgContent, "utf-8");

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${username}-leetcode-stats.svg"`,
  );
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).end(buffer);
}

/**
 * API handler for /api/card/[username]
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
