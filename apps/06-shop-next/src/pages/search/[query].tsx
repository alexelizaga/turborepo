import { NextPage } from 'next';
import { Typography } from '@mui/material';

import { ShopLayout, ProductList, FullScreenLoader } from '@/components';
import { useProducts } from '@/hooks';

const SearchPage: NextPage = () => {

  const { products, isLoading } = useProducts('/search/cybertruck');

  return (
    <ShopLayout title={'Shop - Search'} pageDescription={'Find the best products'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>ABC 123</Typography>

      {
        isLoading
          ? <FullScreenLoader />
          : <ProductList products={products}  />
      }

    </ShopLayout>
  )
}

export default SearchPage;