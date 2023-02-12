import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';

import { getDesignTokens, Sidebar } from '../';
import { DarkBackground } from '../helpers';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NAVIGATION/Sidbar',
  component: Sidebar
} as ComponentMeta<typeof  Sidebar>;

export const Light: ComponentStory<typeof Sidebar> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    < Sidebar {...args} />
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof Sidebar> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      < Sidebar {...args} />
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  header: {
    title: 'Menu'
  },
  anchor: 'left',
  open: true,
  width: 250,
  
};