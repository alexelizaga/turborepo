import React from 'react';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { PeopleOutline } from '@mui/icons-material';
import { Grid } from '@mui/material';

import { AdminLayout } from '@/components';
import { IUser } from '@/interfaces';

const UsersPage = () => {

  const { data, error } = useSWR<IUser[]>('/api/admin/users');

  if ( !data && !error) return (<></>);

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'name', headerName: 'Name', width: 300 },
    { field: 'role', headerName: 'Role', width: 300 },
  ]

  const rows = data!.map(user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role
  }))

  return (
    <AdminLayout
      title='Users'
      subTitle='User maintenance'
      icon={ <PeopleOutline /> }
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

export default UsersPage