import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link, Grid, TextField, Button, Typography, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout';
import { FormValidations, useForm } from '../../hooks';
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
  const { t, i18n } = useTranslation(['auth']);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage, startCreatingUserWithEmailPassword } = useAuthStore();
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

  return (
    <AuthLayout title={t("Register")}>
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label={t("Name")}
              type="text"
              placeholder="Name"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ ({ target }) => onChange(target.value, 'displayName') }
              error={ !!displayNameValid && formSubmitted }
              helperText={ displayNameValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label={t("Email")}
              type="email"
              placeholder="email@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ ({ target }) => onChange(target.value, 'email') }
              error={ !!emailValid  && formSubmitted }
              helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label={t("Password")}
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              value={ password }
              onChange={ ({ target }) => onChange(target.value, 'password') }
              error={ !!passwordValid  && formSubmitted }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid
            item
            xs={12}
            display={ !!errorMessage ? '': 'none' }
          >
            <Alert severity='error'>{ errorMessage }</Alert>
          </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={ isCheckingAuthentication }
                type="submit"
                variant="contained"
                fullWidth
              >
                {t("Create account")}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>{t("Google")}</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>{t("Do you have account?")}</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              {t("Login")}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
