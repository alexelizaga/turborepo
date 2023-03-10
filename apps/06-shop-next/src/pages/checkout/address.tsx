import { ShopLayout } from "@/components";
import { Box, Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";

const AddressPage = () => {
  return (
    <ShopLayout title="Address" pageDescription="Confirm shipping address" >
      <Typography variant="h1" component="h1">Address</Typography>

      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='Name' variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Surname' variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Address' variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Address 2 (optional)' variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label='Postal Code' variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='City' variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select
              variant="filled"
              label="Country"
              value={1}

            >
              <MenuItem value={1}>España</MenuItem>
              <MenuItem value={2}>Costa Rica</MenuItem>
              <MenuItem value={3}>Honduras</MenuItem>
              <MenuItem value={3}>El Salvador</MenuItem>
              <MenuItem value={3}>México</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Phone' variant="filled" fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Check order
        </Button>
      </Box>
    </ShopLayout>
  )
}

export default AddressPage;