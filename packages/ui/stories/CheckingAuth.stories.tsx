import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';

import { getDesignTokens, CheckingAuth } from '../';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/CheckingAuth',
  component:  CheckingAuth
} as ComponentMeta<typeof   CheckingAuth>;

export const Light: ComponentStory<typeof CheckingAuth> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <CheckingAuth />
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof CheckingAuth> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <CheckingAuth />
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
};