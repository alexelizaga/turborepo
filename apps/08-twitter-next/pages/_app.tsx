import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import { EditModal, Layout, LoginModal, RegisterModal } from '@/components'

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
