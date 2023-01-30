import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

import { darkTheme, lightTheme } from '../';
import { Sidebar } from '../components';
import { DarkBackground } from '../helpers';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NAVIGATION/Sidbar',
  component: Sidebar
} as ComponentMeta<typeof  Sidebar>;

export const Light: ComponentStory<typeof Sidebar> = (args) => (
  <ThemeProvider theme={lightTheme}>
    < Sidebar {...args} />
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof Sidebar> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={darkTheme}>
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