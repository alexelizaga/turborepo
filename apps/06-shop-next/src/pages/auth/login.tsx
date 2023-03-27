import { useState } from 'react';
import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material";
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from "@/components";
import { validations } from '@/utils';
import { shopApi } from '@/api';

type FormData = {
  email   : string,
  password: string,
};

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser: SubmitHandler<FormData> = async ({ email, password }) => {
    setShowError(false);
    try {
      const { data } = await shopApi.post('/user/login', { email, password });
      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      console.log('Credentials error');
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
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
