import { useContext } from "react";

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { UIContext } from "../../context/ui";

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Navbar = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ backgroundColor: "background.default", color: "text.primary" }}
      >
        <Box sx={{ paddingTop: "5px", paddingRight: "10px" }}>
          <img
            height="38.5px"
            alt="Maersk logo"
            src={`${origin}/img/MAERSK-B.CO.svg`}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: "h5.fontSize"
          }}
        >
          <Typography variant="inherit">OpenJira</Typography>
        </Box>

        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon color="inherit" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
