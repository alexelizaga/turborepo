import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import useSWR from 'swr';
import { CardMedia, Grid, Link } from '@mui/material';
import { CategoryOutlined } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AdminLayout } from '@/components';
import { IProduct } from '@/interfaces';


const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${ row.slug }`} target='_blank'>
          <CardMedia
            component='img'
            alt={row.title}
            className='fadeIn'
            image={`/products/${row.img}`}
          />
        </a>
      )
    }
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Link underline='always' href={`/admin/products/${row.slug}`} component={NextLink}>
          { row.title }
        </Link>
      )
    }
  },
  { field: 'gender', headerName: 'Gender' },
  { field: 'inStock', headerName: 'stock' },
  { field: 'price', headerName: 'Price' },
  { field: 'sizes', headerName: 'Sizes', width: 250 },
]

const ProductsPage: NextPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return (<></>);

  const rows = data!.map( product => ({
    id      : product._id,
    img     : product.images[0],
    title   : product.title,
    gender  : product.gender,
    inStock : product.inStock,
    price   : product.price,
    sizes   : product.sizes.join(", "),
    slug    : product.slug
  }))

  return (
    <AdminLayout
      title={`Products (${ data?.length })`}
      subTitle={'Products maintenance'}
      icon={<CategoryOutlined />}
    >
      <Grid container sx={{ pt: 2 }} className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width:'100%' }}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={[10]}

          />
        </Grid>
      </Grid>
    </AdminLayout>
  )
}

export default ProductsPage;