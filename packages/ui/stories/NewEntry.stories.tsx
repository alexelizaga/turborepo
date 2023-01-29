import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../';
import { NewEntry } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/NewEntry',
  component:  NewEntry
} as ComponentMeta<typeof   NewEntry>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const LightTemplate: ComponentStory<typeof   NewEntry> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <NewEntry {...args}/>
  </ThemeProvider>
);

const DarkTemplate: ComponentStory<typeof   NewEntry> = (args) => (
  <ThemeProvider theme={darkTheme}>
    <NewEntry {...args}/>
  </ThemeProvider>
);

export const Light = LightTemplate.bind({});

export const Dark = DarkTemplate.bind({});

Light.args = Dark.args = {
  isAdding: false
};