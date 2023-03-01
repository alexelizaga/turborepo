import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";

import { initialData } from "@/database";
import { ItemCounter } from '@/components';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
];

export const CartList = () => {
  return (
    <>
      {
        productsInCart.map( product => (
          <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }} alignItems='center'>
            <Grid item xs={3}>
              {/* Go to product page */}
              <Link
                href="product/slug"
                component={NextLink}
                color="text.primary"
                // sx={{ ml:0.5 }}
              >
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{ product.title }</Typography>
                <Typography variant='body1'>Size: <strong>M</strong></Typography>

                {/* Conditional */}
                <ItemCounter />
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {/* Editable */}
              <Button variant='text' color='secondary'>
                Remove
              </Button>
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
