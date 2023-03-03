import { NextPage, GetServerSideProps } from "next";
import { Box, Button, Grid, Typography } from "@mui/material";

import { ItemCounter, ProductSlideshow, ShopLayout, SizeSelector } from "@/components"
import { IProduct } from '@/interfaces';
import { dbProducts } from "@/database";

type Props = {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {

  // const router = useRouter();
  // const { products: product, isLoading } = useProducts<IProduct>(`/products/${router.query.slug}`);

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  
  const { slug = '' } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);

  console.log({ product });

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
    }
  }
}

export default ProductPage
