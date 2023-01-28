import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar } from '../components';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NAVIGATION/Sidbar',
  component: Sidebar
} as ComponentMeta<typeof  Sidebar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof  Sidebar> = (args) => < Sidebar {...args}/>;

export const Basic = Template.bind({});

Basic.args = {
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