import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

import { darkTheme, lightTheme } from '../';
import { Sidebar } from '../components';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NAVIGATION/Sidbar',
  component: Sidebar
} as ComponentMeta<typeof  Sidebar>;

export const Light: ComponentStory<typeof Sidebar> = (args) => (
  <ThemeProvider theme={lightTheme}>
    < Sidebar {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof Sidebar> = (args) => (
  <ThemeProvider theme={darkTheme}>
    < Sidebar {...args}/>
  </ThemeProvider>
);

Light.args = Dark.args = {
  anchor: 'left',
  open: true,
  width: 250,
  menuItems: [
    { text: "Inbox", icon: <EmailOutlinedIcon /> },
    { text:  "Starred", icon: <InboxOutlinedIcon /> },
    { text:  "Send Email", icon: <EmailOutlinedIcon /> },
    { text:  "Drafts", icon: <InboxOutlinedIcon /> }
  ],
  menuActions: [
    { text: "Inbox", icon: <EmailOutlinedIcon /> },
    { text:  "Starred", icon: <InboxOutlinedIcon /> },
    { text:  "Send Email", icon: <EmailOutlinedIcon /> },
    { text:  "Drafts", icon: <InboxOutlinedIcon /> }
  ]
};