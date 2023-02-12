import { AppBar, Grid, IconButton, Toolbar, Typography, Box, Container } from '@mui/material';
import { LoginOutlined } from "@mui/icons-material";
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';

import { useAuthStore } from '../../store';
import { BcModalSetup } from "../../shared";


export const Navbar = () => {
  const { displayName, startLogout } = useAuthStore();

  const onLogout = () => {
    startLogout();
  }

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ color: "text.primary"}}>
          <ListAltTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              { displayName }
            </Typography>
            <Box>
              <BcModalSetup />
              <IconButton color="inherit" onClick={onLogout}>
                <LoginOutlined />
              </IconButton>
            </Box>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
