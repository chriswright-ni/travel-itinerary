import { createTheme } from "@mui/material/styles";

const theme = createTheme(
  {
    palette: {
      primary: {
        // main: "#2A9D8F",
        main: "#2FA4A9",
        light: "#E0F2F1",
        dark: "#1F6F63",
        selected: "#D6E7FF"
        
      },
      secondary: {
        main: "#FF8A5C",
        // main: "#F39C12",
        // dark: "#E85050",
        light: "#FFD1B3"
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
      // background: {
      //   default: "#F5F7FA",
      //   paper: "#FFFFFF",
      //   secondary: "#F5F5F5"
      //   // secondary: "#EEEEEE"
      background: {
        default: "#F6F8FB",
        paper: "#FFFFFF",
        secondary: "#F5F5F5",
        selected: "#E0F2F1"

        
      },
      text: {
        primary: "#0E1F3F",
        secondary: "#6B7280",
        disabled: "#9E9E9E"
      },
    }
  }

)
export default theme