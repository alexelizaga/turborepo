import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout, FormValidations, useForm, RegisterForm } from 'ui';
import { useAuthStore } from '../../store';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations: FormValidations = {
  email: [ (value: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value), 'Please enter a valid email' ],
  password: [ (value: string) => value.length >= 6, 'Password must has at least 6 characters' ],
  displayName: [ (value: string) => value.length >= 1, 'Name required' ]
}

export const RegisterPage = () => {
  const { t } = useTranslation(['auth']);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage, startGoogleSignIn, startCreatingUserWithEmailPassword } = useAuthStore();
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

  const {
    formState, displayName,email, password, onChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  const onSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    startCreatingUserWithEmailPassword(formState);
  }

  const onGoogleSignIn = () => {
    startGoogleSignIn();
  }

  return (
    <AuthLayout title={t("Register")}>
      <RegisterForm
        t={t}
        displayName={displayName}
        displayNameValid={displayNameValid}
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
  )
}
