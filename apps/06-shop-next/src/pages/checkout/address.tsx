import { useContext } from "react";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { Box, Button, FormControl, Grid, MenuItem, TextField, Typography } from "@mui/material";

import { CartContext } from "@/context";
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

const getAddressFromCookies = (): FormData => {
  const cookiesAddress = JSON.parse(Cookies.get('shippingAddress') || '[]') as FormData;
  return {
    ...cookiesAddress
  }
}

const AddressPage = () => {

  const router = useRouter();
  const { updateShippingAddress } = useContext(CartContext)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  });

  const onSubmitAddress: SubmitHandler<FormData> = async (data) => {
    updateShippingAddress(data);
    router.push('/checkout/summary');
  }

  return (
    <ShopLayout title="Address" pageDescription="Confirm shipping address" >
      <form onSubmit={ handleSubmit(onSubmitAddress) } noValidate>
        <Typography variant="h1" component="h1">Address</Typography>

        <Grid container spacing={2} sx={{ pt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='First name'
              variant="filled"
              fullWidth
              { ...register('firstName', {
                required: 'This field is required'
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
                required: 'This field is required'
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
                required: 'This field is required'
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
              { ...register('address2') }
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
            <TextField 
              label='City' 
              variant="filled" 
              fullWidth
              { ...register('city', {
                required: 'This field is required'
              })}
              error={ !!errors.city }
              helperText={ errors.city?.message }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                label="Country"
                variant="filled"
                defaultValue={getAddressFromCookies().country || countries[0].code}
                { ...register('country', {
                  required: 'This field is required'
                })}
                error={ !!errors.country }
                helperText={ errors.country?.message }
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
              </TextField>
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

export default AddressPage;