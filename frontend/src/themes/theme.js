import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#1A73E8",
        light: "#E8F0FE",
        dark: "#0F5FCC",
      },
      secondary: {
        main: "#FF7043"
      },
      success: {
        main: "#009688"
      },
      background: {
        default: "#F9FAFB",
        paper: "#FFFFFF"
      },
      text: {
        primary: "#111827",
        secondary: "#6B7280"
      }
    }
  }
)

export default theme