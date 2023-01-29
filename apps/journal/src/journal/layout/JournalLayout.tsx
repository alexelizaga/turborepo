import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAnalytics, logEvent } from "firebase/analytics";
import { Box, List, SelectChangeEvent, Toolbar } from "@mui/material"
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';

import { Modal, Navbar, NoteType, SetupModal, Sidebar, SidebarItem } from "ui";
import { ColorModeContext } from '../../theme';
import { onSetActiveNote, useAuthStore, useJournalStore } from '../../store';
import { useAppDispatch } from '../../store/hooks';


const drawerWidth = 280;

export const JournalLayout = ({ children }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(true);

  const { notes } = useJournalStore();
  const { startLogout } = useAuthStore();
  const { t, i18n } = useTranslation(['shared']);
  const [language, setLanguage] = useState('es');
  const { selectColorMode  } = useContext(ColorModeContext);
  const [themeColor, setThemeColor] = useState('dark');
  const analytics = getAnalytics();
  const dispatch = useAppDispatch();

  const handleLanguageChange = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
    const selectedlanguage = e.target.value;
    i18n.changeLanguage(selectedlanguage); //change the language
  };

  const handleThemeChange = (e: SelectChangeEvent) => {
    setThemeColor(e.target.value);
    selectColorMode(e.target.value === 'light' ? 'light': 'dark');
  };

  const onClickNote = (note: NoteType) => {
    logEvent(analytics, 'journal_onClickNote');
    const selectedNote = note;
    dispatch( onSetActiveNote( selectedNote ) );
  }

  return (
    <Box sx={{ display: 'flex'}}>

      <Navbar
        title="Journal"
        openSideMenu={() => setOpenSidebar(v => !v)}
        openModalMenu={() => setOpenModal(true)}
        onLogout={startLogout}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          minWidth: 300,
          width: { sm: openSidebar ? `calc(100vw - ${drawerWidth}px)` : undefined },
        }}
      />

      <Sidebar
        header={{ title: ''}}
        variant='persistent'
        width={drawerWidth}
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        sx={{
          width: { sm: openSidebar ? drawerWidth : 0 },
          flexShrink: { sm: 0 }
        }}
      >
        <List sx={{ pt: 7 }}>
          {
            notes.map((note) => (
              <SidebarItem key={note.id} {...note} onClickNote={onClickNote} />
            ))
          }
        </List>
      </Sidebar>

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
          sx={{ flexGrow: 1, p: 3 }}
          className="animate__animated animate__fadeIn animate__faster"
      >
          <Toolbar />
          { children }
      </Box>

    </Box>
  )
}
