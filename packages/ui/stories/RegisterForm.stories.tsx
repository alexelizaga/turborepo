import { MemoryRouter } from 'react-router-dom'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createTheme, ThemeProvider } from '@mui/material';

import { getDesignTokens, RegisterForm } from '../';
import { DarkBackground } from '../helpers';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'INPUTS/RegisterForm',
  component: RegisterForm
} as ComponentMeta<typeof RegisterForm>;

export const Light: ComponentStory<typeof RegisterForm> = (args) => (
  <ThemeProvider theme={createTheme(getDesignTokens('light'))}>
    <MemoryRouter>
      <RegisterForm {...args} />
    </MemoryRouter>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof RegisterForm> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={createTheme(getDesignTokens('dark'))}>
      <MemoryRouter>
        <RegisterForm {...args} />
      </MemoryRouter>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
  displayName: '',
  displayNameValid: '',
  email: '',
  emailValid: true,
  password: '',
  passwordValid: true,
  onChange: () => {},
  formSubmitted: false,
  errorMessage: null,
  isCheckingAuthentication: false,
  onSubmit: () => {},
  onGoogleSignIn: () => {}
};