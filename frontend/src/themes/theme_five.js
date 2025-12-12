import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#2C8AFF",
        // light: "#48D1B1",
        // dark: "#16A085",
      },
      secondary: {
        main: "#FF6A7A",
        // main: "#F39C12",
        // dark: "#E85050",
        // light: "#FFEDED"
      },
      accent: {
        main: "#FFD85A",
        // main: "#F39C12",
        // dark: "#E85050",
        // light: "#FFEDED"
      },
      success: {
        main: "#1CC7B4"
      },
      warning: {
        main: "#FFD93D"
      },
      background: {
        default: "#F5F7FA",
        paper: "#FFFFFF"
        
      },
      text: {
        primary: "#0E1F3F",
        secondary: "#6D7787",
      },
    }
  }

)
export default theme