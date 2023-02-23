import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout, LoginForm, useForm, FormValidations } from 'ui';
import { useAuthStore } from '../../store';


const formData = {
  email: '',
  password: ''
}

const formValidations: FormValidations = {
  email: [ (value: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value), 'Please enter a valid email' ],
  password: [ (value: string) => value.length >= 6, 'Password must has at least 6 characters' ]
}

export const LoginPage = () => {
  const { t } = useTranslation(['auth']);
  const { status, errorMessage, startGoogleSignIn, startLoginWithEmailPassword } = useAuthStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    formState, email, password, onChange,
    isFormValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;
    startLoginWithEmailPassword(formState);
  }

  const onGoogleSignIn = () => {
    startGoogleSignIn();
  }

  return (
    <AuthLayout title={t('Login')}>
      <LoginForm
        t={t}
        email={email}
        emailValid={emailValid}
        password={password}
        passwordValid={passwordValid}
        onChange={onChange}
        formSubmitted={formSubmitted}
        errorMessage={errorMessage}
        isCheckingAuthentication={isCheckingAuthentication}
        onSubmit={onSubmit}
        onGoogleSignIn={onGoogleSignIn}
      />
    </AuthLayout>
  );
}
