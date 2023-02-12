import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';

import { getDesignTokens, NewEntry } from '../';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/NewEntry',
  component:  NewEntry
} as ComponentMeta<typeof   NewEntry>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const LightTemplate: ComponentStory<typeof   NewEntry> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <NewEntry {...args}/>
  </ThemeProvider>
);

const DarkTemplate: ComponentStory<typeof   NewEntry> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <NewEntry {...args}/>
    </ThemeProvider>
  </DarkBackground>
);

export const Light = LightTemplate.bind({});

export const Dark = DarkTemplate.bind({});

Light.args = Dark.args = {
  isAdding: false
};