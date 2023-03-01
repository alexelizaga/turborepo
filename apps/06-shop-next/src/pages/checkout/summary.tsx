import NextLink from 'next/link';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material";

import { ShopLayout, CartList, OrderSummary } from "@/components";

const SummaryPage = () => {
  return (
    <ShopLayout title="Purchase summary" pageDescription="purchase summary">
      <Typography variant="h1" component="h1">Purchase</Typography>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Summary (3 products)</Typography>
              <Divider sx={{ my: 1.5 }} />

              <Box display="flex" justifyContent="space-between" alignItems="baseline">
                <Typography variant="subtitle1">Shipping Address</Typography>
                <Link
                  href="/checkout/address"
                  component={NextLink}
                  color="text.primary"
                  underline="always"
                >
                  Editar
                </Link>
              </Box>

              
              <Typography>Alex Elízaga</Typography>
              <Typography>26 Some place</Typography>
              <Typography>Madrid, 29550</Typography>
              <Typography>Country</Typography>
              <Typography>+34 918591122</Typography>

              <Divider sx={{ my: 1.5 }} />

              <Box display="flex" justifyContent="end">
                <Link
                  href="/cart"
                  component={NextLink}
                  color="text.primary"
                  underline="always"
                >
                  Editar
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage;