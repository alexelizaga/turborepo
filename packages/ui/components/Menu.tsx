import { FC, useState } from 'react';
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu as MuiMenu,
  MenuItem
} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ListAltIcon from '@mui/icons-material/ListAlt';

type Props = {
  app: string;
  children?: JSX.Element | JSX.Element[];
}

export const Menu: FC<Props> = ({ app, children }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'white', textTransform: 'none' }}
      >
        { children }
      </Button>
      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { app !== 'Calendar' && (
          <MenuItem onClick={() => window.location.href = 'https://calendar.brocodejs.com'}>
            <ListItemIcon>
              <CalendarMonthIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Calendar</ListItemText>
          </MenuItem>
        )}
        { app !== 'Journal' && (
          <MenuItem onClick={() => window.location.href =  'https://journal.brocodejs.com'}>
            <ListItemIcon>
              <ListAltIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Journal</ListItemText>
          </MenuItem>
        )}
        { app !== 'Kanban' && (
          <MenuItem onClick={() => window.location.href =  'https://kanban.brocodejs.com'}>
            <ListItemIcon>
              <ViewKanbanIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Kanban</ListItemText>
          </MenuItem>
        )}
      </MuiMenu>
    </div>
  )
}
