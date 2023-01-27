import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Navbar } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/Navbar',
  component: Navbar
} as ComponentMeta<typeof  Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof  Navbar> = () => < Navbar />;

export const Basic = Template.bind({});

