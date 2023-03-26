import NextLink from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthLayout } from "@/components";

type FormData = {
  email   : string,
  password: string,
};

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onLoginUser: SubmitHandler<FormData> = ( data ) => {
    console.log({ data });
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={ handleSubmit(onLoginUser) }>
        <Box sx={{ width: 350, p: '10px 20px'}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">Login</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                { ...register('email') }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                { ...register('password') }
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
