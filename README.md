## How to Use

To display your LeetCode stats on your GitHub profile or site, simply paste the following URL into your profile's README file and replace username with your actual LeetCode `username` (e.g., iyehah).

```md
![Stats](https://leetcode-status.vercel.app/api/iyehah?theme=transparent&logo=true&custom_title=Iyehah%20Hacen&logo_color=theme)
```

Alternatively, you can use the <img> tag:

```md
<img src="https://leetcode-status.vercel.app/api/iyehah?theme=transparent&logo=true&custom_title=Iyehah%20Hacen&logo_color=theme"/>
```

## Available Themes

Choose from the available themes to match your profile's style:

|        Name        |                                          Card Preview                                                                                           |Graph Preview|
| :----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------: |:-------:|
| *light (Default)*  | <img src="https://leetcode-status.vercel.app/api/card/numb3r5?theme=light&logo=true&logo_color=theme&custom_title=Iyehah%20Hacen" height=150/>       |<img src="https://leetcode-status.vercel.app/api/graph/numb3r5?theme=light&logo=true&logo_color=theme&custom_title=Iyehah%20Hacen" height=150/>       |
|      *dark*        | <img src="https://leetcode-status.vercel.app/api/card/numb3r5?theme=dark&logo=true&logo_color=theme&custom_title=Iyehah%20Hacen" height=150/>        |<img src="https://leetcode-status.vercel.app/api/graph/numb3r5?theme=dark&logo=true&logo_color=theme&custom_title=Iyehah%20Hacen" height=150/>        |
|  *transparent*     | <img src="https://leetcode-status.vercel.app/api/card/numb3r5?theme=transparent&logo=true&logo_color=theme&custom_title=Iyehah%20Hacen" height=150/> |<img src="https://leetcode-status.vercel.app/api/graph/numb3r5?theme=transparent&logo=true&logo_color=theme&custom_title=Iyehah%20Hacen" height=150/>|

## Customization

You can customize the appearance of your stats graph using various URL parameters.

### Common Options

|      Argument       |               Description                |             Value Type              |
| :-----------------: | :--------------------------------------: | :---------------------------------: |
|      `border`       |        Show or hide the border           |       boolean (default: `true`)     |
|    `hide_title`     |        Show or hide the title            |       boolean (default: `false`)    |
|   `custom_title`    |        Set a custom title text           |              string                 |
|      `logo`         |        Show or hide the logo             |       boolean (default: `true`)     |
|   `logo_color`      |  Set the logo color (`default`, `theme`, or your custom color) | string (default: `default`) |
|   `animation`       |      Enable or disable animation         |       boolean (default: `true`)     |
| `animation_duration`|      Set animation duration time         |      string (default: `2s`)         |
|      `theme`        |        Set the theme (e.g., `dark`,`light`,`transparent`)        |        string (default: `light`)    |

### Example:
```md
![Stats](https://leetcode-status.vercel.app/api/iyehah?theme=transparent&logo=true&custom_title=Iyehah%20Hacen&logo_color=%2300FF00)
```
<div align="center">
<img src="https://leetcode-status.vercel.app/api/card/numb3r5?theme=dark&&border=false&custom_title=Iyehah%20Hacen&logo=true&logo_color=default"/>
  <br/>
<img src="https://leetcode-status.vercel.app/api/graph/numb3r5?theme=dark&&border=false&custom_title=Iyehah%20Hacen&logo=true&logo_color=default&bars_width=50"/>
</div>

> - For `custom_title`, use `%20` for spaces (e.g., Iyehah%20Hacen).
> - For `logo_color`, use `%23` for the # symbol in hex codes (e.g., %2300712D for dark green).

---
