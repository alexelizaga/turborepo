import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { FC } from 'react';

type Props = {
  title?: string;
  openSideMenu?: () => void;
}

export const Navbar: FC<Props> = ({ title = '', openSideMenu}) => {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar>
        { openSideMenu && <IconButton
          color='inherit'
          size='large'
          edge='start'
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>}
        <Typography variant='h6'>{ title }</Typography>
      </Toolbar>
    </AppBar>
  )
}
