import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

type Props = {
  t?: (text: string) => string;
  email: any;
  emailValid: any;
  password: any;
  passwordValid: any;
  onChange: any;
  formSubmitted: boolean;
  errorMessage: string | null;
  isCheckingAuthentication: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onGoogleSignIn: () => void;
}

export const LoginForm: FC<Props> = ({
  t = (text) => text,
  email,
  emailValid,
  password,
  passwordValid,
  onChange,
  formSubmitted,
  errorMessage,
  isCheckingAuthentication,
  onSubmit,
  onGoogleSignIn
}) => {
  return (
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
  )
}
