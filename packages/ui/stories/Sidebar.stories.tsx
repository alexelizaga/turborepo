import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NAVIGATION/Sidbar',
  component: Sidebar
} as ComponentMeta<typeof  Sidebar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof  Sidebar> = (args) => < Sidebar {...args}/>;

export const Basic = Template.bind({});

Basic.args = {
  open: true,
  width: 250
};