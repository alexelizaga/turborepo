import { MemoryRouter } from 'react-router-dom'
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme } from '../';
import { LoginForm } from '../components';
import { DarkBackground } from '../helpers';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'INPUTS/LoginForm',
  component: LoginForm
} as ComponentMeta<typeof LoginForm>;

export const Light: ComponentStory<typeof LoginForm> = (args) => (
  <ThemeProvider theme={lightTheme}>
    <MemoryRouter>
      <LoginForm {...args} />
    </MemoryRouter>
  </ThemeProvider>
);

export const Dark: ComponentStory<typeof LoginForm> = (args) => (
  <DarkBackground>
    <ThemeProvider theme={darkTheme}>
      <MemoryRouter>
        <LoginForm {...args} />
      </MemoryRouter>
    </ThemeProvider>
  </DarkBackground>
);

Light.args = Dark.args = {
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