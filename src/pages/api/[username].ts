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
  data: LeetCodeData,
  animation: boolean,
  animationDuration: string,
  logo: boolean,
  logoColor: string | undefined,
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
  const title = customTitle ? customTitle : username;
  const totalSolved = data.totalSolved;
  const totalEasy = data.totalEasy;
  const totalMedium = data.totalMedium;
  const totalHard = data.totalHard;

  const progressPercentage = isNaN(totalSolved / (totalEasy + totalMedium + totalHard)) ? 0 : totalSolved / (totalEasy + totalMedium + totalHard);
  const circumference = 2 * Math.PI * 50;
  const progressArc = progressPercentage * circumference;

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
    const logoHeight = 28; 
    const logoWidth = 40;
    const logoX = 20;
    const logoY = 25;

    if (logo) {
      const logoX = 20;
      const logoY = hideTitle ? 10 : 10;
      const defaultColors = ["#B3B1B0", "#E7A41F", "#070706"];

      const isValidColor = logoColor && (logoColor.startsWith('#') || logoColor.startsWith('%23'));

      let primaryColor, secondaryColor, tertiaryColor;

      if (logoColor === "theme") {
        primaryColor = secondaryColor = tertiaryColor = textColor;
      } else if (logoColor === "default") {
        [primaryColor, secondaryColor, tertiaryColor] = defaultColors;
      } else if (isValidColor) {
        primaryColor = secondaryColor = tertiaryColor = logoColor;
      } else {
        [primaryColor, secondaryColor, tertiaryColor] = defaultColors;
      }

      svgParts.push(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="leetcode" x="${logoX}" y="${logoY}" width="${logoWidth}" height="${logoHeight}">
          <path fill="${primaryColor}" d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"></path>
          <path fill="${secondaryColor}" d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"></path>
          <path fill="${tertiaryColor}" d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"></path>
        </svg>`
      );
    }
    
    const titleX = logoX + logoWidth + 10;
    const titleY =logoY + logoHeight/4;
  
    svgParts.push(
      `<text x="${titleX}" y="${titleY}" font-size="25" font-weight="bold" text-anchor="start" fill="${textColor}">${title}</text>`
    );
  }
  

  const centerX = 70;
  const centerY = hideTitle ? 100 : 120;
  const radius = 50;

  // Circle with Progress Arc
  svgParts.push(
    `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="${progressBackgroundColor}" stroke="${progressBarBackgroundColor}" stroke-width="4"/>`,
    `<circle cx="${centerX}" cy="${centerY}" r="${radius}" fill="none" stroke="${progressBarFillColor}" stroke-width="4"
        stroke-dasharray="${progressArc} ${circumference}" stroke-linecap="round" transform="rotate(-90 ${centerX} ${centerY})" 
        class="${animation ? 'animated-progress' : ''}" />`,
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
      `<rect x="${barX}" y="${barY + 5}" width="${barWidth}" height="${barHeight}"  rx="3" ry="3" fill="${progressBarBackgroundColor}" />`,
      `<rect x="${barX}" y="${barY + 5}" width="${isNaN(filledWidth) ? 0 : filledWidth}" height="${barHeight}" rx="3" ry="3" fill="${bar.color}" class="${animation ? 'animated-bar' : ''}" />`
    );
  });

  if (animation) {
    svgParts.push(
      `<style>
        .animated-progress {
          animation: progressAnimation ${animationDuration} ease-in-out;
        }
        .animated-bar {
          animation: barAnimation ${animationDuration} ease-in-out;
        }
        @keyframes progressAnimation {
          from {
            stroke-dasharray: 0 ${circumference};
          }
          to {
            stroke-dasharray: ${progressArc} ${circumference};
          }
        }
        @keyframes barAnimation {
          from {
            width: 0;
          }
          to {
            width: ${progressArc};
          }
        }
      </style>`
    );
  }

  svgParts.push('</svg>');
  return svgParts.join('\n');
}

async function handleGetRequest(
  username: string,
  theme: string,
  border: boolean,
  hideTitle: boolean,
  customTitle: string | undefined,
  animation: boolean,
  animationDuration: string,
  logo: boolean,
  logoColor: string | undefined,
  res: ApiResponse
) {
  const data: LeetCodeData = await fetchLeetCodeData(username);

  if (!data || isNaN(data.totalSolved) || isNaN(data.totalEasy) || isNaN(data.totalMedium) || isNaN(data.totalHard)) {
    return res.status(500).json({ error: 'Failed to generate image: Invalid or incomplete data' });
  }

  const svgContent = createSVG(username, theme, border, hideTitle, customTitle, data, animation, animationDuration, logo, logoColor);
  const buffer = Buffer.from(svgContent, 'utf-8');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Content-Disposition', `inline; filename="${username}-leetcode-stats.svg"`);
  res.status(200).end(buffer);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const { username, theme = 'light', border = 'true', hide_title = 'false', custom_title, animation = 'true', animation_duration = '2s', logo = 'false',logo_color } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username not provided' });
  }

  const borderOption = border === 'true';
  const hideTitle = hide_title === 'true';
  const animationOption = animation === 'true';
  const logoOption = logo === 'true';
  const animationDuration = typeof animation_duration === 'string' ? animation_duration : '2s';

  if (req.method === 'GET') {
    return await handleGetRequest(username, theme, borderOption, hideTitle, custom_title, animationOption, animationDuration, logoOption , logo_color , res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
