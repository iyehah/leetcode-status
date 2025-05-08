# LeetCode Status

A Next.js application to display your LeetCode statistics as SVG cards or graphs, perfect for GitHub profiles or personal websites.

## How to Use

Add your LeetCode stats to your GitHub profile or site by using the following URL in your README, replacing `username` with your LeetCode username (e.g., `iyehah`):

```md
![Stats](https://leetcode-status.vercel.app/api/card/iyehah?theme=gradient&gradient_start=%236366F1&gradient_end=%23A855F7&logo=true&custom_title=Iyehah%20Hacen)
```

Or use an `<img>` tag:

```md
<img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=gradient&gradient_start=%236366F1&gradient_end=%23A855F7&logo=true&custom_title=Iyehah%20Hacen"/>
```


## Available Themes

Choose from the following themes:

| Name | Card Preview | Graph Preview | Pie Preview |
|------|--------------|---------------|-------------|
| *light (Default)* | <img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=light&logo=true&custom_title=Iyehah%20Hacen" height=150/> | <img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=light&bars_width=50" height=150/> | <img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=light&bars_width=50" height=150/> |
| *dark* | <img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=dark&logo=true&custom_title=Iyehah%20Hacen" height=150/> | <img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=dark&bars_width=50" height=150/> | <img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=dark&bars_width=50" height=150/> |
| *transparent* | <img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=transparent&logo=true&custom_title=Iyehah%20Hacen" height=150/> | <img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=transparent&bars_width=50" height=150/> | <img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=transparent&bars_width=50" height=150/> |
| *neon* | <img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=neon&logo=true&custom_title=Iyehah%20Hacen" height=150/> | <img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=neon&bars_width=50" height=150/> | <img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=neon&bars_width=50" height=150/> |
| *pastel* | <img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=pastel&logo=true&custom_title=Iyehah%20Hacen" height=150/> | <img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=pastel&bars_width=50" height=150/> | <img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=pastel&bars_width=50" height=150/> |
| *gradient* | <img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=gradient&gradient_start=%236366F1&gradient_end=%23A855F7&logo=true&custom_title=Iyehah%20Hacen" height=150/> | <img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=gradient&gradient_start=%236366F1&gradient_end=%23A855F7&bars_width=50" height=150/> | <img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=gradient&gradient_start=%236366F1&gradient_end=%23A855F7&bars_width=50" height=150/> |


## Customization

Customize the appearance using URL parameters.

### Common Options

| Argument | Description | Value Type |
|----------|-------------|------------|
| `border` | Show or hide the border | boolean (default: `true`) |
| `hide_title` | Show or hide the title | boolean (default: `false`) |
| `custom_title` | Set a custom title text | string |
| `logo` | Show or hide the LeetCode logo | boolean (default: `true`) |
| `logo_color` | Set logo color (`default`, `theme`, or hex like `%2300FF00`) | string (default: `default`) |
| `animation` | Enable or disable animation | boolean (default: `true`) |
| `animation_duration` | Set animation duration | homing string (default: `2s`) |
| `theme` | Set theme (`light`, `dark`, `transparent`, `neon`, `pastel`, `gradient`) | string (default: `light`) |
| `bar_color` | Custom color for progress bars (hex like `%23FF0000`) | string |
| `text_color` | Custom color for text (hex like `%230000FF`) | string |
| `show_stats` | Show additional stats (ranking, acceptance rate) | boolean (default: `false`) |
| `font` | Change font | boolean (default: `Robote`) |

### Card-Specific Options

| Argument | Description | Value Type |
|----------|-------------|------------|
| `gradient_start` | Gradient start color (hex like `%236366F1`) | string (default: `#6366F1` for gradient theme) |
| `gradient_end` | Gradient end color (hex like `%23A855F7`) | string (default: `#A855F7` for gradient theme) |

### Graph-Specific Options

| Argument | Description | Value Type |
|----------|-------------|------------|
| `bars_width` | Width of bars in the graph | number (20-100, default: `50`) |

### Pie-Specific Options

| Argument      | Description                    | Value Type                |
| ------------- | ------------------------------ | ------------------------- |
| `easyColor`   | Color for Easy section (hex)   | `%23FF0000` (e.g., red)   |
| `mediumColor` | Color for Medium section (hex) | `%2300FF00` (e.g., green) |
| `hardColor`   | Color for Hard section (hex)   | `%230000FF` (e.g., blue)  |
| `showLabels`  | Show or hide percentage labels | boolean (default: `true`) |
| `showLegend`  | Show or hide the legend        | boolean (default: `true`) |
| `pieRadius`   | Radius of the pie chart        | number (default: `100`)   |
| `font`        | Font family used for text      | string (e.g., `Arial`)    |

### Examples

Card with gradient theme and custom gradient colors:

```md
<img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=gradient&gradient_start=%23FF0000&gradient_end=%2300FF00&show_stats=true"/>
```

<img src="https://leetcode-status.vercel.app/api/card/iyehah?theme=gradient&gradient_start=%23FF0000&gradient_end=%2300FF00&show_stats=true"/>

Graph with neon theme and wider bars:

```md
<img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=neon&bars_width=80"/>
```

<img src="https://leetcode-status.vercel.app/api/graph/iyehah?theme=neon&bars_width=80"/>

Pie with transparent theme without Labels :

```md
<img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=transparent&showLabels=false"/>
```
<img src="https://leetcode-status.vercel.app/api/pie/iyehah?theme=transparent&showLabels=false"/>

> **Notes**:
> - Use `%20` for spaces in `custom_title` (e.g., `Iyehah%20Hacen`).
> - Use `%23` for `#` in hex colors (e.g., `%2300712D` for dark green).
> - The `show_stats` option requires the LeetCode API to provide `ranking` and `acceptanceRate`.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```
   For `canvas`:
   - Install MSYS2 and GTK2:
     ```bash
     pacman -S mingw-w64-x86_64-gtk2
     ```
     Add `C:\msys64\mingw64\bin` to `PATH`.
   - Set GTK paths:
     ```bash
     set PKG_CONFIG_PATH=C:\msys64\mingw64\lib\pkgconfig
     set CAIRO_CFLAGS=-IC:\msys64\mingw64\include\cairo
     set CAIRO_LIBS=-LC:\msys64\mingw64\lib -lcairo
     npm install canvas --build-from-source
     ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Deploy**:
   Deploy to Vercel or another platform supporting Next.js.

## Contributing

Contributions are welcome! Please open an issue or pull request at [github.com/iyehah/leetcode-status](https://github.com/iyehah/leetcode-status).

## License

MIT
