import React from 'react';
import { NextPage } from 'next';
import { ConfirmationNumberOutlined } from '@mui/icons-material';

import { AdminLayout } from '@/components';

const OrdersPage: NextPage = () => {
  return (
    <AdminLayout
      title={'Orders'}
      subTitle={'Order maintenance'}
      icon={<ConfirmationNumberOutlined />}
    >
      
    </AdminLayout>
  )
}

export default OrdersPage;