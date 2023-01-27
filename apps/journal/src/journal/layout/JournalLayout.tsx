import { Box, Toolbar } from "@mui/material"
import { Navbar, Sidebar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({ children }: any) => {
  return (
    <Box sx={{ display: 'flex'}}>
        <Navbar />

        <Sidebar drawerWidth={ drawerWidth } />

        <Box
            component='main'
            sx={{ flexGrow: 1, p: 3}}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Toolbar />

            { children }

        </Box>

    </Box>
  )
}
