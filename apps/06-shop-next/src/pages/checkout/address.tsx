import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { ShopLayout } from "@/components";
import { countries } from '@/utils';

type FormData = {
  firstName : string;
  lastName  : string;
  address   : string;
  address2? : string;
  zip       : string;
  city      : string;
  country   : string;
  phone     : string;
}

const AddressPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log({ data });
  }

  return (
    <ShopLayout title="Address" pageDescription="Confirm shipping address" >
      <form onSubmit={ handleSubmit(onSubmit) } noValidate>
        <Typography variant="h1" component="h1">Address</Typography>

        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='First name'
              variant="filled"
              fullWidth
              { ...register('firstName', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Min 2 characters' }
              })}
              error={ !!errors.firstName }
              helperText={ errors.firstName?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Last name'
              variant="filled"
              fullWidth
              { ...register('lastName', {
                required: 'This field is required',
                minLength: { value: 2, message: 'Min 2 characters' }
              })}
              error={ !!errors.lastName }
              helperText={ errors.lastName?.message }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Address'
              variant="filled"
              fullWidth
              { ...register('address', {
                required: 'This field is required',
                minLength: { value: 3, message: 'Min 3 characters' }
              })}
              error={ !!errors.address }
              helperText={ errors.address?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Address 2 (optional)'
              variant="filled"
              fullWidth
              { ...register('address2', {
                minLength: { value: 3, message: 'Min 3 characters' }
              })}
              error={ !!errors.address2 }
              helperText={ errors.address2?.message }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Zip'
              variant="filled"
              fullWidth
              { ...register('zip', {
                required: 'This field is required'
              })}
              error={ !!errors.zip }
              helperText={ errors.zip?.message }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='City' variant="filled" fullWidth />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="select-country" variant="filled">Country</InputLabel>
              <Select
                labelId="select-country"
                label="Country"
                variant="filled"
                value={'ESP'}
                { ...register('country', {
                  required: 'This field is required'
                })}
              >
                {
                  countries.map( country => (
                    <MenuItem
                      key={country.code}
                      value={country.code}
                    >
                      { country.name }
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="tel"
              label='Phone'
              variant="filled"
              fullWidth
              { ...register('phone', {
                required: 'This field is required'
              })}
              error={ !!errors.phone }
              helperText={ errors.phone?.message }
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type='submit'
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Check order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  )
}

/*
  It is executed whenever the client makes a request,
  before displaying the component that we have above.

  If we see the component we know that the token is valid.
*/

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {

//   const { token = '' } = req.cookies;
//   let isValidToken = false;

//   try {
//     await jwt.isValidToken( token );
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if ( !isValidToken ) {
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/address',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
      
//     }
//   }
// }

export default AddressPage;