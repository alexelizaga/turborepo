import NextLink from 'next/link';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from "@mui/material";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";

import { ShopLayout, CartList, OrderSummary } from "@/components";

const OrderPage = () => {
  return (
    <ShopLayout title="Order" pageDescription="order summary">
      <Typography variant="h1" component="h1">Order: 123456789</Typography>
      <Chip
        sx={{ my: 2 }}
        label="Pending"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label="Payment complete"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
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
                {/* Pay */}
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Payment complete"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage;