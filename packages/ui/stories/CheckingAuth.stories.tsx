import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../';
import { CheckingAuth } from '../components';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/CheckingAuth',
  component:  CheckingAuth
} as ComponentMeta<typeof   CheckingAuth>;

export const Light: ComponentStory<typeof CheckingAuth> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <CheckingAuth />
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof CheckingAuth> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={darkTheme}>
      <CheckingAuth />
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
};