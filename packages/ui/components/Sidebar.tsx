import { FC } from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const menuItems = [ "Inbox", "Starred", "Send Email", "Drafts" ]

type Props = {
  open?: boolean;
  width?: number;
  onClose?: () => void
}

export const Sidebar: FC<Props> = ({ width = 250, open = true, onClose }) => {

  return (
    <Drawer
      anchor="left"
      open={ open }
      onClose={ onClose }
    >
      <Box sx={{ width }}>
        <Box sx={{ p: '5px 10px' }}>
          <Typography variant="h4" >Menu</Typography>
        </Box>

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                </ListItemIcon>
                <ListItemText primary={ text } />
              </ListItem>
            ))
          }
        </List>

        <Divider />

        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon /> }
                </ListItemIcon>
                <ListItemText primary={ text } />
              </ListItem>
            ))
          }
        </List>

      </Box>
    </Drawer>
  )
}
