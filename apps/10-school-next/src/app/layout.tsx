import { Inter } from 'next/font/google';

import { AuthContextProvider } from '@/context/AuthContext';
import { LoginModal, RegisterModal, Navbar } from '@/components';
import { ToasterProvider } from '@/providers';
import './globals.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'School',
  description: 'BroCode School',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar />
          <div className='pb-20 pt-28'>
            { children }
          </div>
        </AuthContextProvider>
      </body>
    </html>
  )
}
