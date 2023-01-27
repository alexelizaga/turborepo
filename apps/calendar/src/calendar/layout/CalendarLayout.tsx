import { Box, Toolbar } from "@mui/material"
import { Navbar } from "../components";


export const CalendarLayout = ({ children }: any) => {
  return (
    <Box sx={{ display: 'flex'}}>
        <Navbar />
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
