import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../';
import { Navbar } from '../components';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SURFACES/Navbar',
  component: Navbar
} as ComponentMeta<typeof  Navbar>;

export const Light: ComponentStory<typeof Navbar> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <Navbar {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof Navbar> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={darkTheme}>
      <Navbar {...args}/>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  title: 'BroCode',
  openSideMenu: () => {},
  openModalMenu: () => {}
};