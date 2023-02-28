import { red } from "@mui/material/colors"

export const lightTheme = () => {
  return {
    background: {
      default: "white",
    },
    primary: {
      main: "#61AED1",
    },
    secondary: {
      main: "#143D69",
    },
    error: {
      main: red.A400,
    },
  }
}