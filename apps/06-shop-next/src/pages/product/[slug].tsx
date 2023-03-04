import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { Box, Button, Grid, Typography } from "@mui/material";

import { ItemCounter, ProductSlideshow, ShopLayout, SizeSelector } from "@/components"
import { IProduct } from '@/interfaces';
import { dbProducts } from "@/database";

type Props = {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

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
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>

            {/* Add to cart */}
            <Button color="secondary" className="circular-btn">
              Add to cart
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

// 1. GET STATIC PATHS
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map((slug) => ({
      params: slug
    })),
    // fallback: false
    fallback: 'blocking'
  }
}

// 2. GET STATIC PROPS
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage
