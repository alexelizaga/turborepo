'use client';

import { FC } from 'react';
import { User } from 'firebase/auth';

import { Categories, Container, Logo, UserMenu } from '@/components';
import { useAuthContext } from '@/context/AuthContext';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: FC<NavbarProps> = () => {
  const { currentUser } = useAuthContext()
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div
        className='
          py-4
          border-b-[1px]
        '
      >
        <Container>
          <div
            className='
              flex
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            '
          >
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar