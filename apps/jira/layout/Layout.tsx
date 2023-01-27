import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar } from '../components';
import { Button } from 'ui';


type Props = {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Layout: FC<Props> = ({ title = 'Jira', children }) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{ title }</title>
        <Navbar />
        <Button />
        {/* Sidebar */}

        <Box sx={{ p: '10px 20px'}}>
          { children }
        </Box>
      </Head>
    </Box>
  )
}
