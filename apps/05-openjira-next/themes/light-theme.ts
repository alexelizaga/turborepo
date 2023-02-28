import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const lightTheme = createTheme({
  typography: {
    fontFamily: [
      "Maersk Headline",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    mode: "light",
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
  },

  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {},
    },
  },
});
