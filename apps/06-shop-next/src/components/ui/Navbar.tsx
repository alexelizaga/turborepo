
import NextLink from 'next/link';
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';

export const Navbar = () => {

  const { asPath } = useRouter();

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
          <Typography variant="h6">Maersk |</Typography>
          <Typography sx={{ ml: 0.5 }}>Shop</Typography>
        </Link>

        <Box flex="1" />

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link href="/category/men" component={NextLink} sx={{ ml: 0.5 }}>
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              Men
            </Button>
          </Link>
          <Link
            href="/category/women"
            component={NextLink}
            sx={{ ml: 0.5 }}
          >
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
              Women
            </Button>
          </Link>
          <Link
            href="/category/kids"
            component={NextLink}
            sx={{ ml: 0.5 }}
          >
            <Button color={asPath === "/category/kids" ? "primary" : "info"}>
              Kids
            </Button>
          </Link>
        </Box>

        <Box flex="1" />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <Link
          href="/cart"
          component={NextLink}
          color="text.primary"
          sx={{ ml: 0.5 }}
        >
          <IconButton>
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </Link>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  );
}
