import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout';
import { useForm, FormValidations } from '../../hooks';
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
  const { t, i18n } = useTranslation(['auth']);
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
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label={t('Email')}
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
              label={t('Password')}
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
                { t('Login') }
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={ isCheckingAuthentication }
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>{t('Google')}</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              { t('Create new account') }
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}
