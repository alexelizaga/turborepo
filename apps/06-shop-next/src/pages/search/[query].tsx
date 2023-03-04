import { NextPage, GetServerSideProps } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout, ProductList } from '@/components';
import { dbProducts } from '@/database';
import { IProduct } from '@/interfaces';

type Props = {
  products: IProduct[];
}

const SearchPage: NextPage<Props> = ({ products }) => {
  return (
    <ShopLayout title={'Shop - Search'} pageDescription={'Find the best products'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>ABC 123</Typography>

      <ProductList products={products}  />

    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string };

  if ( !query.length ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm(query);

  // si no hay productos retornar otros productos


  return {
    props: {
      products
    }
  }
}

export default SearchPage;