import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';

import { getDesignTokens, Navbar } from '../';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/Navbar',
  component: Navbar
} as ComponentMeta<typeof  Navbar>;

export const Light: ComponentStory<typeof Navbar> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <Navbar {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof Navbar> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <Navbar {...args}/>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  title: 'BroCode',
  openSideMenu: () => {},
  openModalMenu: () => {}
};