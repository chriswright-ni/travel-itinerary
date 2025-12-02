import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#3366FF",
        light: "#E8FOFE",
        dark: "#254EDB",
      },
      secondary: {
        main: "#FF6B6B",
        dark: "#E85050",
        light: "#FFEDED"
      },
      success: {
        main: "#4CAF50"
      },
      warning: {
        main: "#FFD93D"
      },
      background: {
        default: "#FFFFFF",
        // paper: "#F5F6FA"
        paper: "#EDF2F7"
      },
      text: {
        primary: "#1A1A1A",
        secondary: "#6B6B6B",
      },
    }
  }

)
export default theme