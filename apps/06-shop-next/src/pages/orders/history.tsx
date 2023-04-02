import { NextPage } from 'next';
import NextLink from 'next/link';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '@/components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Full Name', width: 300 },

  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows if the order is off or not',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label="Paid" variant='outlined' />
          : <Chip color='error' label="Not paid" variant='outlined' />
      )
    }
  },

  {
    field: 'order',
    headerName: 'See order',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link
          href={`/orders/${params.row.id}`}
          component={NextLink}
          color="text.primary"
          underline='always'
        >
          See order
        </Link>
      )
    }
  },
];

const rows = [
  { id: 1, paid: true, fullname: 'Alex Elízaga' },
  { id: 2, paid: false, fullname: 'Javier Elízaga' },
  { id: 3, paid: true, fullname: 'Laura Elízaga' },
  { id: 4, paid: false, fullname: 'Fernando Elízaga' },
  { id: 5, paid: false, fullname: 'José Manuel Elízaga' },
  { id: 6, paid: true, fullname: 'Jaime García' }
]

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout title='Order history' pageDescription='Customer order history'>
      <Typography variant='h1' component='h1'>Order history</Typography>

      <Grid container sx={{ pt: 2 }}>
        <Grid item xs={12} sx={{ height: 650, width:'100%' }}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            pageSize={ 10 }
            rowsPerPageOptions={[10]}

          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage