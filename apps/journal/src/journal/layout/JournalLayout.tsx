import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, SelectChangeEvent, Toolbar } from "@mui/material"
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';

import { Modal, Navbar, SetupModal } from "ui";
import { Sidebar } from '../components';
import { ColorModeContext } from '../../theme';


const drawerWidth = 280;

export const JournalLayout = ({ children }: any) => {
  const [openModal, setOpenModal] = useState(false);

  const { t, i18n } = useTranslation(['shared']);
  const [language, setLanguage] = useState('es');
  const { selectColorMode  } = useContext(ColorModeContext);
  const [themeColor, setThemeColor] = useState('dark');

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
        title="Journal"
        openSideMenu={() => {}}
        openModalMenu={() => setOpenModal(true)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      />

      <Sidebar drawerWidth={drawerWidth} />

      <Modal
        header={{
          title: 'Settings',
          icon: <SettingsIcon />
        }}
        open={openModal}
        onClick={() => setOpenModal(false)}
        onClose={() => setOpenModal(false)}
      >
        <SetupModal
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
