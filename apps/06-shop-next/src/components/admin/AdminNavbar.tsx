
import { useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, Chip, Link, Toolbar, Typography } from '@mui/material';

import { UIContext } from '@/context';

export const AdminNavbar = () => {

  const { toggleSideMenu } = useContext( UIContext );

  return (
    <AppBar>
      <Toolbar>
        <Link
          href="/"
          component={NextLink}
          color="text.primary"
          display="flex"
          alignItems="center"
        >
          {
            process.env.NODE_ENV === 'development' && (
              <Chip sx={{ mr: 1 }} label="DEV" size="small" color="primary" variant="outlined" />
            )
          } 
          <Typography variant="h6">BroCode |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>

        <Box flex="1" />

        <Button onClick={ toggleSideMenu }>Menu</Button>
      </Toolbar>
    </AppBar>
  );
}
