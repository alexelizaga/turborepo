import { FC, useContext } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar, Sidebar } from 'ui';
import { UIContext } from '../context/ui';


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
      <Sidebar open={ sidemenuOpen } onClose={closeSideMenu} />

      <Box sx={{ p: '10px 20px'}}>
        { children }
      </Box>
    </Box>
  )
}
