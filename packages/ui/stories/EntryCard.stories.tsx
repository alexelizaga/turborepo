import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { getDesignTokens, EntryCard } from '../';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/EntryCard',
  component:  EntryCard
} as ComponentMeta<typeof   EntryCard>;

export const Light: ComponentStory<typeof EntryCard> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <EntryCard {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof EntryCard> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <EntryCard {...args}/>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  entry: {
    _id: uuidv4(),
    description: 'Laborum veniam id ea sint minim est do ad veniam mollit labore sit do nostrud.',
    createdAt: Date.now(),
    status: 'to-do'
  }
};