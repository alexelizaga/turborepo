import NextLink from 'next/link';
import { AppBar, IconButton, Link, Toolbar } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

export const Navbar= () => {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
        >
          <MenuOutlined />
        </IconButton>
        <Link
          href="/"
          component={NextLink}
          variant="h6"
          color="text.primary"
          sx={{ textDecoration: 'none'}}
        >
          Cookie Master
        </Link>
        <div style={{ flex: 1 }} />
        <Link
          href="/theme-changer"
          component={NextLink}
          variant="h6"
          color="text.primary"
          sx={{ textDecoration: 'none'}}
        >
          Change theme
        </Link>
      </Toolbar>
    </AppBar>
  )
}
