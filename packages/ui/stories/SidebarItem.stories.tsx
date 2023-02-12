import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';

import { getDesignTokens, SidebarItem } from '../';
import { DarkBackground } from '../helpers';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NAVIGATION/SidebarItem',
  component: SidebarItem
} as ComponentMeta<typeof SidebarItem>;

export const Light: ComponentStory<typeof SidebarItem> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <SidebarItem {...args} />
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof SidebarItem> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <SidebarItem {...args} />
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  title: 'Event',
  body: 'Details',
  id: 'test-id',
  date: Date.now(),
  imageUrls: []
};