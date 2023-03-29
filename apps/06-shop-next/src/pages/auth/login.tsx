import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';

import { AuthContext } from '@/context';
import { AuthLayout } from "@/components";
import { validations } from '@/utils';

type FormData = {
  email   : string,
  password: string,
};

const LoginPage = () => {

  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser: SubmitHandler<FormData> = async ({ email, password }) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if ( !isValidLogin ) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    const destionation = router.query.p?.toString() || '/';
    router.replace(destionation);
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box sx={{ width: 350, p: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Login</Typography>
              <Chip
                label="We don't recognize that user/password"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ display: showError ? 'flex' : 'none', mt: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                { ...register('email', {
                  required: 'This field is required',
                  validate: validations.isEmail
                })}
                error={ !!errors.email }
                helperText={ errors.email?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                { ...register('password', {
                  required: 'This field is required',
                  minLength: { value: 6, message: 'Min 6 characters' }
                })}
                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent='end'>
              <Link
                href="/auth/register"
                component={NextLink}
                color="text.primary"
                underline='always'
              >
                do not you have an account?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
