import { createContext, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, PaletteMode } from '@mui/material';

import { getDesignTokens } from './helpers/getDesignTokens';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  selectColorMode: (theme: 'dark' | 'light') => {}
});

export const AppTheme = ({ children }: any) => {  
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      selectColorMode: (theme: 'dark' | 'light') => setMode(theme)
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          { children }
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}