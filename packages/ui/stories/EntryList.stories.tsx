import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { darkTheme, lightTheme } from '../';
import { EntryList } from '../components';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/EntryList',
  component:  EntryList
} as ComponentMeta<typeof EntryList>;

export const Light: ComponentStory<typeof EntryList> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <EntryList {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof EntryList> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={darkTheme}>
      <EntryList {...args}/>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  status: "to-do",
  entries: [
    {
      _id: uuidv4(),
      description: 'To Do:Sunt nostrud adipisicing non veniam incididunt qui dolore pariatur id qui esse reprehenderit.',
      status: 'to-do',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'In Progress: Anim voluptate amet officia in.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Done: Anim deserunt consequat cupidatat ipsum cupidatat.',
      status: 'done',
      createdAt: Date.now() - 100000000
    }
  ]
};