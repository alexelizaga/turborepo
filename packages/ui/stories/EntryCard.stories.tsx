import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { darkTheme, lightTheme } from '../';
import { EntryCard } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/EntryCard',
  component:  EntryCard
} as ComponentMeta<typeof   EntryCard>;

export const Light: ComponentStory<typeof EntryCard> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <EntryCard {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof EntryCard> = (args) => (
  <ThemeProvider theme={darkTheme}>
    <EntryCard {...args}/>
  </ThemeProvider>
);

Light.args = Dark.args = {
  entry: {
    _id: uuidv4(),
    description: 'Laborum veniam id ea sint minim est do ad veniam mollit labore sit do nostrud.',
    createdAt: Date.now(),
    status: 'to-do'
  }
};