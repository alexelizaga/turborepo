import { ComponentStory, ComponentMeta } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';

import { EntryCard } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/EntryCard',
  component:  EntryCard
} as ComponentMeta<typeof   EntryCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof   EntryCard> = (args) => <EntryCard {...args}/>;

export const Basic = Template.bind({});

Basic.args = {
  entry: {
    _id: uuidv4(),
    description: 'Laborum veniam id ea sint minim est do ad veniam mollit labore sit do nostrud.',
    createdAt: Date.now(),
    status: 'to-do'
  }
};