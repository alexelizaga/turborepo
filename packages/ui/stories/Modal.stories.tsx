import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';


import { getDesignTokens, Modal } from '../';
import { DarkBackground } from '../helpers';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'FEEDBACK/Modal',
  component: Modal
} as ComponentMeta<typeof  Modal>;

export const Light: ComponentStory<typeof Modal> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <Modal {...args}/>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof Modal> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <Modal {...args}/>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  open: true,
  header: {
    title: 'Settings',
    icon: <SettingsIcon />
  },
  children: (
    <>
      <h1>Content</h1>
    </>
  )
};