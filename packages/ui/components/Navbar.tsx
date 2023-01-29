import { FC } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Grid, SxProps, Theme } from '@mui/material';
import MenuIcon from '@mui/icons-material/MenuOutlined';
import ViewKanbanIcon from '@mui/icons-material/ViewKanbanOutlined';
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';
import { LoginOutlined } from '@mui/icons-material';

import { Menu } from './';

type Props = {
  title?: string;
  openSideMenu?: () => void;
  openModalMenu?: () => void;
  onLogout?: () => void;
  sx?: SxProps<Theme>;
}

export const Navbar: FC<Props> = ({
  title = '',
  openSideMenu,
  openModalMenu,
  onLogout,
  sx
}) => {
  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={sx}
    >
      <Toolbar>
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
          { openSideMenu ? (
              <IconButton
                color='inherit'
                size='large'
                edge='start'
                onClick={openSideMenu}
              >
                <MenuIcon />
              </IconButton>
            ):(
              <Box width={'64px'} />
            )
          }
          <Menu app={'Kanban'}>
            <ViewKanbanIcon sx={{ mr: 1 }} />
            <Typography variant='h6'>{ title }</Typography>
          </Menu>
          <Box>
            { openModalMenu && (
                <IconButton color="inherit" onClick={openModalMenu}>
                  <SettingsIcon />
                </IconButton>
              )
            }
            { onLogout && (
              <IconButton color="inherit" onClick={onLogout}>
                <LoginOutlined />
              </IconButton>
            )}
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
