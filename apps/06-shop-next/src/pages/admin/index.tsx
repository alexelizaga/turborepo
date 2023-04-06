import React from 'react';
import { NextPage } from 'next';
import { DashboardOutlined } from '@mui/icons-material';

import { AdminLayout } from '@/components';

const DashboardPage: NextPage = () => {
  return (
    <AdminLayout
      title='Dashboard'
      subTitle='General Statistics'
      icon={<DashboardOutlined />}
    >
      <h3>Hello world</h3>
    </AdminLayout>
  )
}

export default DashboardPage;