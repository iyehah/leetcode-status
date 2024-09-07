import { createCanvas, CanvasRenderingContext2D } from 'canvas';
import { fetchLeetCodeData } from '@/utils/leetcode';
import { lightTheme } from '@/themes/light';
import { darkTheme } from '@/themes/dark';
import { transparentTheme } from '@/themes/transparent';
import { ApiRequest, ApiResponse, LeetCodeData } from '@/types';

function drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
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

  const canvasWidth = 500;
  const canvasHeight = 200;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const context = canvas.getContext('2d');
 


  if (!context) {
    return res.status(500).json({ error: 'Failed to create canvas context' });
  }

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

  context.fillStyle = backgroundColor;
  drawRoundedRect(context, 0, 0, canvasWidth, canvasHeight, 20);
  context.fill();

  if (border) {
    context.strokeStyle = borderColor;
    context.lineWidth = 2;
    drawRoundedRect(context, 0, 0, canvasWidth, canvasHeight, 20);
    context.stroke();
  }

  if (!hideTitle) {
    const title = customTitle ? customTitle : `${username}'s LeetCode Status`;
    context.fillStyle = textColor;
    context.font = 'bold 20px Arial';
    const titleX = canvasWidth /context.measureText(title).width +10;
    context.fillText(title, titleX, 40);
  }

  const centerX = 80;
  const centerY = hideTitle ? 100 : 120;
  const radius = 50;
  const totalSolved = data.totalSolved;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  context.fillStyle = progressBackgroundColor;
  context.fill();

  const progressArc = (totalSolved / (data.totalEasy + data.totalMedium + data.totalHard)) * 2 * Math.PI;
  context.beginPath();
  context.arc(centerX, centerY, radius * 0.9, -Math.PI / 2, -Math.PI / 2 + progressArc);
  context.strokeStyle = progressBarFillColor;
  context.lineWidth = 8;
  context.stroke();

  context.fillStyle = textColor;
  context.font = 'bold 20px Arial';
  const text = totalSolved.toString();
  const textWidth = context.measureText(text).width;
  context.fillText(text, centerX - textWidth / 2, centerY + 8);

  const bars = [
    { label: 'Easy', solved: data.easySolved, total: data.totalEasy, color: '#10B981' },
    { label: 'Medium', solved: data.mediumSolved, total: data.totalMedium, color: '#F59E0B' },
    { label: 'Hard', solved: data.hardSolved, total: data.totalHard, color: '#EF4444' }
  ];

  bars.forEach((bar, index) => {
    const barX = 220;
    const barY = hideTitle ? 40 + index * 50 : 60 + index * 50;
    const barWidth = canvasWidth * 0.35;
    const barHeight = 10;
    const filledWidth = Math.min((bar.solved / bar.total) * barWidth, barWidth); // Ensure filled width doesn't exceed bar width
    const cornerRadius = 6;

    context.fillStyle = textColor;
    context.font = 'bold 16px Arial';
    context.fillText(`${bar.label}`, barX - 70, barY + 10);
    context.fillText(`${bar.solved} / ${bar.total}`, barX + barWidth + 10, barY + 10);

    context.fillStyle = progressBarBackgroundColor;
    drawRoundedRect(context, barX, barY, barWidth, barHeight, cornerRadius);
    context.fill();

    context.fillStyle = bar.color;
    drawRoundedRect(context, barX, barY, filledWidth, barHeight, cornerRadius);
    context.fill();
  });

  const buffer = canvas.toBuffer('image/png');

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Disposition', `inline; filename="${username}-leetcode-stats.png"`);
  res.status(200).end(buffer);
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
