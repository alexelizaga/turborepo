import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { SidebarItem } from './';
import { useJournalStore, useAuthStore } from "../../store";

interface SidebarProps {
  drawerWidth?: number;
}

export const Sidebar = ({ drawerWidth = 240 }: SidebarProps) => {
  const { displayName } = useAuthStore();
  const { notes } = useJournalStore();

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" // temporary
        open
        sx={{
          display: { xs: "block", top: '30px' },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          }
        }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              { displayName }
            </Typography>
          </Grid>
        </Toolbar>
        <Divider />

        <List>
          {
            notes.map((note) => (
              <SidebarItem key={note.id} {...note} />
            ))
          }
        </List>
      </Drawer>
    </Box>
  );
};
