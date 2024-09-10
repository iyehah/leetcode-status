import { fetchLeetCodeData } from '@/utils/leetcode';
import { lightTheme } from '@/themes/light';
import { darkTheme } from '@/themes/dark';
import { transparentTheme } from '@/themes/transparent';
import { ApiRequest, ApiResponse, LeetCodeData } from '@/types';

function createBarGraphSVG(
  easySolved: number,
  mediumSolved: number,
  hardSolved: number,
  theme: string,
  animation: boolean = true,
  animationDuration: string = '5s',
  border: boolean = false,
  barWidth: number = 50
): string {
  let themeColors = lightTheme;

  if (theme === 'dark') {
    themeColors = darkTheme;
  } else if (theme === 'transparent') {
    themeColors = transparentTheme;
  }

  const {
    backgroundColor,
    textColor,
    gridLines
  } = themeColors;

  // Define SVG container dimensions
  const svgWidth = 500;
  const svgHeight = 300;

  // Define bar spacing
  const barSpacing = 40;
  const maxBarHeight = 200; // Max height for the tallest bar

  // Calculate the max solved value to set the scale
  const maxSolved = Math.max(easySolved, mediumSolved, hardSolved);
  const scaleFactor = maxBarHeight / maxSolved;

  // Dynamically calculate Y-axis labels
  const yAxisLabels = Array.from({ length: 4 }, (_, i) => Math.round((maxSolved / 3) * i));

  // Define colors for the bars
  const easyColor = "#10B981";
  const mediumColor = "#F59E0B";
  const hardColor = "#EF4444";

  // Border style for the bars
  const barBorder = border ? `border:1px solid ${textColor};border-radius:12px;` : '';

  // Optional animation
  const animationCode = animation
    ? `
      <animate attributeName="height" from="0" to="${easySolved * scaleFactor}" dur="${animationDuration}" fill="freeze" />
    `
    : '';

  // SVG elements
  return `
    <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor};${barBorder}">
      <!-- X Axis -->
      <line x1="50" y1="${svgHeight - 50}" x2="${svgWidth - 20}" y2="${svgHeight - 50}" stroke="${textColor}" stroke-width="2" />
      
      <!-- Y Axis -->
      <line x1="50" y1="${svgHeight - 50}" x2="50" y2="30" stroke="${textColor}" stroke-width="2" />

      <!-- Grid Lines and Numbers -->
      ${yAxisLabels.map((label, i) => `
        <line x1="50" y1="${svgHeight - 50 - (label * scaleFactor)}" x2="${svgWidth - 20}" y2="${svgHeight - 50 - (label * scaleFactor)}" stroke="${gridLines}" stroke-width="0.5"/>
        <text x="20" y="${svgHeight - 50 - (label * scaleFactor)}" font-size="12" fill="${textColor}">${label}</text>
      `).join('')}

      <!-- Easy Bar -->
      <rect x="100" y="${svgHeight - 50 - (easySolved * scaleFactor)}" width="${barWidth}" height="${easySolved * scaleFactor}" fill="${easyColor}">
        ${animation ? `<animate attributeName="height" from="0" to="${easySolved * scaleFactor}" dur="${animationDuration}" fill="freeze" />` : ''}
      </rect>
      <text x="110" y="${svgHeight - 30}" font-size="14" fill="${textColor}">Easy</text>

      <!-- Medium Bar -->
      <rect x="200" y="${svgHeight - 50 - (mediumSolved * scaleFactor)}" width="${barWidth}" height="${mediumSolved * scaleFactor}" fill="${mediumColor}">
        ${animation ? `<animate attributeName="height" from="0" to="${mediumSolved * scaleFactor}" dur="${animationDuration}" fill="freeze" />` : ''}
      </rect>
      <text x="200" y="${svgHeight - 30}" font-size="14" fill="${textColor}">Medium</text>

      <!-- Hard Bar -->
      <rect x="300" y="${svgHeight - 50 - (hardSolved * scaleFactor)}" width="${barWidth}" height="${hardSolved * scaleFactor}" fill="${hardColor}">
        ${animation ? `<animate attributeName="height" from="0" to="${hardSolved * scaleFactor}" dur="${animationDuration}" fill="freeze" />` : ''}
      </rect>
      <text x="310" y="${svgHeight - 30}" font-size="14" fill="${textColor}">Hard</text>
    </svg>
  `;
}

async function handleGetRequest(
  username: string,
  res: ApiResponse,
  theme: string,
  animation: boolean,
  animationDuration: string,
  border: boolean,
  barWidth: number
) {
  // Fetch the data from LeetCode API
  const data: LeetCodeData = await fetchLeetCodeData(username);

  // Validate data
  if (!data || isNaN(data.totalSolved)) {
    return res.status(500).json({ error: 'Failed to generate image: Invalid or incomplete data' });
  }

  // Generate the SVG content
  const svgContent = createBarGraphSVG(
    data.easySolved,
    data.mediumSolved,
    data.hardSolved,
    theme,
    animation,
    animationDuration,
    border,
    barWidth
  );
  const buffer = Buffer.from(svgContent, 'utf-8');

  // Set the response headers
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Content-Disposition', `inline; filename="${username}-leetcode-stats.svg"`);
  res.status(200).end(buffer);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const { username, animation = 'true', animation_duration = '2s', theme = 'light', border = 'false', bars_width = '50' } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username not provided' });
  }

  const parsedAnimation = animation === 'true';
  const parsedBorder = border === 'true';
  const parsedBarWidth = Number(bars_width);

  if (req.method === 'GET') {
    return await handleGetRequest(
      username,
      res,
      theme,
      parsedAnimation,
      animation_duration,
      parsedBorder,
      parsedBarWidth
    );
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
