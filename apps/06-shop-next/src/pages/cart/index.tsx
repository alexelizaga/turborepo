import { Box, Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";

import { ShopLayout, CartList } from "@/components";

const CartPage = () => {
  return (
    <ShopLayout title="Cart - 3" pageDescription="Store shopping cart">
      <Typography variant="h1" component="h1">Cart</Typography>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>
              <Divider sx={{ my: 1 }} />

              {/* OrderSummary */}

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default CartPage;