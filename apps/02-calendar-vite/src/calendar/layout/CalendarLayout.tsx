import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, SelectChangeEvent, Toolbar } from "@mui/material";
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';

import { Modal, Navbar, SetupModal } from "ui";
import { useAuthStore } from "../../store";
import { ColorModeContext } from "../../theme";


export const CalendarLayout = ({ children }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const { startLogout } = useAuthStore();
  const { t, i18n } = useTranslation(['shared']);
  const [language, setLanguage] = useState('es');
  const { selectColorMode  } = useContext(ColorModeContext);
  const [themeColor, setThemeColor] = useState('light');

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
    const selectedlanguage = e.target.value;
    i18n.changeLanguage(selectedlanguage); //change the language
  };

  const handleThemeChange = (e: SelectChangeEvent) => {
    setThemeColor(e.target.value);
    selectColorMode(e.target.value === 'light' ? 'light': 'dark');
  };

  return (
    <Box sx={{ display: 'flex'}}>
        <Navbar
          title="Calendar"
          openModalMenu={() => setOpenModal(true)}
          onLogout={startLogout}
        />

        <Modal
          t={t}
          header={{
            title: t('Settings')!,
            icon: <SettingsIcon />
          }}
          open={openModal}
          onClick={() => setOpenModal(false)}
          onClose={() => setOpenModal(false)}
        >
          <SetupModal
            t={t}
            language={language}
            themeColor={themeColor}
            handleLanguageChange={ handleLanguageChange}
            handleThemeChange={handleThemeChange}
          />
        </Modal>

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
