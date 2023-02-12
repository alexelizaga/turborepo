import { useNavigate } from "react-router-dom";
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import { LoginOutlined } from "@mui/icons-material";

import { useAuthStore } from "../../store";
import { BcAppBar, BcBox, BcContainer, BcGrid, BcIconButton, BcModalSetup, BcToolbar, BcTypography, useBcTheme } from "../../shared";


export const Navbar = () => {
  const navigate = useNavigate();
  const { displayName, startLogout } = useAuthStore();

  const onLogout = () => {
    startLogout();
  }

  return (
      <BcAppBar
        position="fixed"
        sx={{ width: { sm: '100%' } }}
      >
        <BcContainer maxWidth="xl">
          <BcToolbar disableGutters sx={{ color: "text.primary"}}>
            <CalendarMonthTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <BcGrid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <BcTypography variant="h6" noWrap component="div">
                { displayName }
              </BcTypography>
              <BcBox>
                <BcModalSetup />
                <BcIconButton onClick={onLogout} color="inherit">
                  <LoginOutlined />
                </BcIconButton>
              </BcBox>
            </BcGrid>
          </BcToolbar>
        </BcContainer>
      </BcAppBar>
  )
}
