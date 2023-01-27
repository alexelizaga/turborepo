import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'INPUTS/Button',
  component: Button
} as ComponentMeta<typeof  Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof  Button> = () => < Button />;

export const Primary = Template.bind({});

