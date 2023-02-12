import { PaletteMode } from "@mui/material";

import { lightTheme, darkTheme } from "../";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? lightTheme()
      : darkTheme()),
  },
});
