import { FC, useContext } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SettingsIcon from '@mui/icons-material/SettingsTwoTone';

import { MenuItem, Navbar, Sidebar, Modal, SetupModal } from 'ui';
import { UIContext } from '../context/ui';

const menuItems: MenuItem[] = [
  { text: "Inbox", icon: <EmailOutlinedIcon /> },
  { text:  "Starred", icon: <InboxOutlinedIcon /> },
  { text:  "Send Email", icon: <EmailOutlinedIcon /> },
  { text:  "Drafts", icon: <InboxOutlinedIcon /> }
]

const menuActions: MenuItem[] = [
  { text: "Inbox", icon: <EmailOutlinedIcon /> },
  { text:  "Starred", icon: <InboxOutlinedIcon /> },
  { text:  "Send Email", icon: <EmailOutlinedIcon /> },
  { text:  "Drafts", icon: <InboxOutlinedIcon /> }
]

type Props = {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Layout: FC<Props> = ({ title = 'Jira', children }) => {
  const {
    isSidebarOpen,
    isModalOpen,
    setIsSidebarOpen,
    setIsModalOpen
  } = useContext(UIContext);
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{ title }</title>
      </Head>
      <Navbar
        title={title}
        openSideMenu={() => setIsSidebarOpen(true)}
        openModalMenu={() => setIsModalOpen(true)}
      />
      <Sidebar
        menuItems={menuItems}
        menuActions={menuActions}
        open={ isSidebarOpen }
        onClose={() => setIsSidebarOpen(false)}
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
