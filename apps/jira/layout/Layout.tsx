import { FC, useContext } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';

import { Navbar, Modal, SetupModal } from 'ui';
import { UIContext } from '../context/ui';

type Props = {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Layout: FC<Props> = ({ title = 'Jira', children }) => {
  const {
    isModalOpen,
    setIsModalOpen
  } = useContext(UIContext);
  return (
    <Box sx={{ flexFlow: 1, pt: 7 }}>
      <Head>
        <title>{ title }</title>
      </Head>
      <Navbar
        title={title}
        openModalMenu={() => setIsModalOpen(true)}
        onLogout={() => {}}
      />
      <Modal
        header={{
          title: 'Settings',
          icon: <SettingsIcon />
        }}
        open={isModalOpen}
        onClick={() => setIsModalOpen(false)}
        onClose={() => setIsModalOpen(false)}
      >
        <SetupModal />
      </Modal>

      <Box sx={{ p: '10px 20px'}}>
        { children }
      </Box>
    </Box>
  )
}
