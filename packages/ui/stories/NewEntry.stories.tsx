import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewEntry } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/NewEntry',
  component:  NewEntry
} as ComponentMeta<typeof   NewEntry>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof   NewEntry> = (args) => <  NewEntry {...args}/>;

export const Basic = Template.bind({});

Basic.args = {
  isAdding: false
};