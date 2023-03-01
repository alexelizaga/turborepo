import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout, ProductList } from '@/components';
import { initialData } from '@/database';
import { IProduct } from '@/interfaces';

const HomePage: NextPage = () => {
  return (
    <ShopLayout title={'Shop - Home'} pageDescription={'Find the best products'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All the products</Typography>

      <ProductList products={initialData.products as IProduct[]}  />
    </ShopLayout>
  )
}

export default HomePage;