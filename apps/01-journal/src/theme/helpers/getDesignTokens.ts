import { PaletteMode } from "@mui/material";

import { purpleTheme, darkTheme } from "../themes";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? purpleTheme()
      : darkTheme()),
  },
});
