import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material";

import { ItemCounter } from '@/components';
import { CartContext } from '@/context';

type Props = {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {
        cart.map( product => (
          <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }} alignItems='center'>
            <Grid item xs={3}>
              {/* Go to product page */}
              <Link
                href={`/product/${product.slug}`}
                component={NextLink}
                color="text.primary"
              >
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component='img'
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{ product.title }</Typography>
                <Typography variant='body1'>Size: <strong>{ product.size }</strong></Typography>

                {
                  editable
                    ? (
                      <ItemCounter
                        currentValue={product.quantity}
                        maxValue={product.inStock}
                        updateQuantity={() => ({})}
                      />
                    )
                    : (
                      <Typography variant='h5'>
                        { `${product.quantity} ${product.quantity > 1 ? 'items' : 'item'}`}
                      </Typography>
                    )
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
              {
                editable && (
                  <Button variant='text' color='secondary'>
                    Remove
                  </Button>
                )
              }
              
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
