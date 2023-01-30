import { MemoryRouter } from 'react-router-dom'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../';
import { RegisterForm } from '../components';
import { DarkBackground } from '../helpers';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'INPUTS/RegisterForm',
  component: RegisterForm
} as ComponentMeta<typeof RegisterForm>;

export const Light: ComponentStory<typeof RegisterForm> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <MemoryRouter>
      <RegisterForm {...args} />
    </MemoryRouter>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof RegisterForm> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={darkTheme}>
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