import { FC } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";

export type MenuItem = {
  icon?: JSX.Element,
  text: string
}

type Props = {
  anchor?:  "left" | "top" | "right" | "bottom";
  menuActions?: MenuItem[];
  menuItems?: MenuItem[];
  open?: boolean;
  width?: number;
  onClose?: () => void
}

export const Sidebar: FC<Props> = ({ anchor = 'left',  menuActions, menuItems, width = 250, open = true, onClose }) => {

  return (
    <Drawer
      anchor={ anchor }
      open={ open }
      onClose={ onClose }
    >
      <Box sx={{ width: anchor === 'left' || anchor === 'right' ? width : '100%' }}>
        <Box sx={{ p: '5px 10px' }}>
          <Typography variant="h4" >Menu</Typography>
        </Box>

        <List>
          {
            menuItems?.map(({text, icon}, index) => (
              <ListItem disablePadding key={text}>
                <ListItemButton>
                  { icon && (
                    <ListItemIcon>
                      { icon }
                    </ListItemIcon>
                    )
                  }
                  <ListItemText primary={ text } />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

        { menuActions && <Divider /> }

        <List>
          {
             menuActions?.map(({text, icon}, index) => (
              <ListItem disablePadding key={text}>
                <ListItemButton>
                  { icon && (
                    <ListItemIcon>
                      { icon }
                    </ListItemIcon>
                    )
                  }
                  <ListItemText primary={ text } />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

      </Box>
    </Drawer>
  )
}
