import { FC, useContext } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { MenuItem, Navbar, Sidebar } from 'ui';
import { UIContext } from '../context/ui';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';

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
  const { sidemenuOpen, openSideMenu, closeSideMenu } = useContext(UIContext);
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{ title }</title>
      </Head>
      <Navbar title={title} openSideMenu={openSideMenu} />
      <Sidebar menuItems={menuItems} menuActions={menuActions} open={ sidemenuOpen } onClose={closeSideMenu} />

      <Box sx={{ p: '10px 20px'}}>
        { children }
      </Box>
    </Box>
  )
}
