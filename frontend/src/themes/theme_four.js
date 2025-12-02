import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#1ABC9C",
        light: "#48D1B1",
        dark: "#16A085",
      },
      secondary: {
        // main: "#FF6B6B",
        main: "#F39C12",
        // dark: "#E85050",
        // light: "#FFEDED"
      },
      success: {
        main: "#4CAF50"
      },
      warning: {
        main: "#FFD93D"
      },
      background: {
        default: "#F9FAFB",
        paper: "#FFFFFF"
        
      },
      text: {
        primary: "#1A1A1A",
        secondary: "#6B6B6B",
      },
    }
  }

)
export default theme