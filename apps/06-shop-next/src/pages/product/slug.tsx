import { ProductSlideshow, ShopLayout } from "@/components"

import { initialData } from "@/database"
import { Box, Button, Grid, Typography } from "@mui/material";

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">

            {/* Titles */}
            <Typography variant="h1" component="h1">{ product.title }</Typography>
            <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

            {/* Amount */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Amount</Typography>
              {/* Item counter */}
            </Box>

            {/* Add to basket */}
            <Button color="secondary" className="circular-btn">
              Add to basket
            </Button>

            {/* <Chip label="Out of stock" color="error" variant="outlined"/> */}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{ product.description }</Typography>
            </Box>


          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default ProductPage