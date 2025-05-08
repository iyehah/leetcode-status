## Pie Chart

You can display your LeetCode statistics as a pie chart using the following URL. You can customize the colors, radius, font, and toggle labels or the legend.

### Usage

```md
<img src="https://leetcode-status.vercel.app/api/pie/iyehah" />
```

### Arguments

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

```md
<img src="https://leetcode-status.vercel.app/api/pie/iyehah?easyColor=%23FF0000&mediumColor=%2300FF00&hardColor=%230000FF" />
<img src="https://leetcode-status.vercel.app/api/pie/iyehah?showLabels=false&showLegend=false&pieRadius=120&font=Arial" />
```
