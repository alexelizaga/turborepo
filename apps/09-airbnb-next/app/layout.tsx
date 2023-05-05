import { Nunito } from 'next/font/google';

import { LoginModal, Navbar, RegisterModal, RentModal } from '@/components';
import { ToasterProvider } from '@/providers';
import getCurrentUser from '@/app/actions/getCurrentUser';

import './globals.css';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ["latin"]
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
