import { fetchLeetCodeData } from '@/utils/leetcode';
import { lightTheme } from '@/themes/light';
import { darkTheme } from '@/themes/dark';
import { transparentTheme } from '@/themes/transparent';
import { ApiRequest, ApiResponse, LeetCodeData } from '@/types';

function createSVG(
  username: string, 
  theme: string, 
  border: boolean, 
  hideTitle: boolean, 
  customTitle: string | undefined, 
  data: LeetCodeData
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
    progressBackgroundColor,
    progressBarBackgroundColor,
    progressBarFillColor,
    borderColor
  } = themeColors;

  const canvasWidth = 500;
  const canvasHeight = 200;
  const title = customTitle ? customTitle : `${username}'s LeetCode Status`;
  const totalSolved = data.totalSolved;
  const totalEasy = data.totalEasy;
  const totalMedium = data.totalMedium;
  const totalHard = data.totalHard;

  const progressPercentage = isNaN(totalSolved / (totalEasy + totalMedium + totalHard)) ? 0 : totalSolved / (totalEasy + totalMedium + totalHard);
  const circumference = 2 * Math.PI * 50;
  const progressArc = progressPercentage * circumference; // Updated to use percentage

  const svgParts: string[] = [
    `<svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">`,
    `<rect x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" rx="20" ry="20" fill="${backgroundColor}" />`
  ];

  if (border) {
    svgParts.push(
      `<rect x="0" y="0" width="${canvasWidth}" height="${canvasHeight}" rx="20" ry="20" fill="none" stroke="${borderColor}" stroke-width="2" />`
    );
  }

  if (!hideTitle) {
    svgParts.push(
      `<text x="${canvasWidth / 2}" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="${textColor}">${title}</text>`
    );
  }

  const centerX = 80;
  const centerY = hideTitle ? 100 : 120;
  const radius = 50;

  // Circle with Progress Arc
  svgParts.push(
    `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${progressBackgroundColor}" stroke="${progressBarBackgroundColor}" stroke-width="4"/>`,
    `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${progressBarFillColor}" stroke-width="${progressPercentage == 0 ? 0 : 4}"
        stroke-dasharray="${progressArc} ${circumference}" stroke-linecap="round" transform="rotate(-90 ${centerX} ${centerY})" />`,
    `<text x="${centerX}" y="${centerY + 8}" font-size="20" font-weight="bold" text-anchor="middle" fill="${textColor}">${totalSolved}</text>`
  );

  // Progress Bars
  const bars = [
    { label: 'Easy', solved: data.easySolved, total: totalEasy, color: '#10B981' },
    { label: 'Medium', solved: data.mediumSolved, total: totalMedium, color: '#F59E0B' },
    { label: 'Hard', solved: data.hardSolved, total: totalHard, color: '#EF4444' }
  ];

  bars.forEach((bar, index) => {
    const barX = 220;
    const barY = hideTitle ? 40 + index * 50 : 60 + index * 50;
    const barWidth = canvasWidth * 0.35;
    const barHeight = 4;
    const filledWidth = Math.min((bar.solved / bar.total) * barWidth, barWidth);

    svgParts.push(
      `<text x="${barX - 70}" y="${barY + 10}" font-size="16" font-weight="" fill="${textColor}">${bar.label}</text>`,
      `<text x="${barX + barWidth + 10}" y="${barY + 10}" font-size="16" font-weight="" fill="${textColor}">${bar.solved} / ${bar.total}</text>`,
      `<rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}"  rx="3" ry="3" fill="${progressBarBackgroundColor}" />`,
      `<rect x="${barX}" y="${barY}" width="${isNaN(filledWidth)? 0 : filledWidth}" height="${barHeight}" rx="3" ry="3" fill="${bar.color}" />`
    );
  });

  svgParts.push('</svg>');
  return svgParts.join('\n');
}

async function handleGetRequest(
  username: string,
  theme: string,
  border: boolean,
  hideTitle: boolean,
  customTitle: string | undefined,
  res: ApiResponse
) {
  const data: LeetCodeData = await fetchLeetCodeData(username);

  if (!data || isNaN(data.totalSolved) || isNaN(data.totalEasy) || isNaN(data.totalMedium) || isNaN(data.totalHard)) {
    return res.status(500).json({ error: 'Failed to generate image: Invalid or incomplete data' });
  }

  const svgContent = createSVG(username, theme, border, hideTitle, customTitle, data);
  const buffer = Buffer.from(svgContent, 'utf-8'); // Convert SVG string to Buffer
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Content-Disposition', `inline; filename="${username}-leetcode-stats.svg"`);
  res.status(200).end(buffer); // Use end() with Buffer
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const { username, theme = 'light', border = 'true', hide_title = 'false', custom_title } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username not provided' });
  }

  const borderOption = border === 'true';
  const hideTitle = hide_title === 'true';

  if (req.method === 'GET') {
    return await handleGetRequest(username, theme, borderOption, hideTitle, custom_title, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
