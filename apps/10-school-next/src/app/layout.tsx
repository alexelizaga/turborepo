import { Inter } from 'next/font/google';

import { LoginModal, RegisterModal, Navbar } from '@/components';
import { ToasterProvider } from '@/providers';
import { Providers } from './providers';

import './globals.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'School',
  description: 'BroCode School',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <Providers>
          <LoginModal />
          <RegisterModal />
          <Navbar />
          <div className='pb-20 pt-28'>
            { children }
          </div>
        </Providers>
      </body>
    </html>
  )
}
