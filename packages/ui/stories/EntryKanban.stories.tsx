import { ComponentStory, ComponentMeta } from '@storybook/react';
import { v4 as uuidv4 } from 'uuid';

import { EntryKanban, EntryList, NewEntry } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/EntryKanban',
  component:  EntryKanban
} as ComponentMeta<typeof EntryKanban>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EntryKanban> = (args) => <EntryKanban {...args}/>;

export const Basic = Template.bind({});

Basic.args = {
  boards: [
    {
      title: 'To Do',
      actions: <NewEntry isAdding={false} setIsAdding={() => {}} onSave={() => {}} />,
      list: <EntryList status={'to-do'} entries={[
        {
          _id: uuidv4(),
          description: 'To Do:Sunt nostrud adipisicing non veniam incididunt qui dolore pariatur id qui esse reprehenderit.',
          status: 'to-do',
          createdAt: Date.now()
        }
      ]} />
    },
    {
      title: 'In Progress',
      list: <EntryList status={'in-progress'} entries={[
        {
          _id: uuidv4(),
          description: 'In Progress: Anim voluptate amet officia in.',
          status: 'in-progress',
          createdAt: Date.now() - 1000000
        }
      ]} />
    },
    {
      title: 'Done',
      list: <EntryList status={'done'} entries={[
        {
          _id: uuidv4(),
          description: 'Done: Anim deserunt consequat cupidatat ipsum cupidatat.',
          status: 'done',
          createdAt: Date.now() - 100000000
        }
      ]} />
    },
    {
      title: 'Shopping',
      list: <EntryList status={'shopping'} entries={[
        {
          _id: uuidv4(),
          description: 'Shopping: Anim deserunt consequat cupidatat ipsum cupidatat.',
          status: 'shopping',
          createdAt: Date.now() - 100000000
        }
      ]} />
    }
  ]
};