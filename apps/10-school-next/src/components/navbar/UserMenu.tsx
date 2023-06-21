'use client';

import { FC, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { AiOutlineMenu } from 'react-icons/ai';

import { Avatar, MenuItem } from '@/components';
import { useLoginModal, useRegisterModal } from '@/hooks';
import { logout } from '@/firebase/auth';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, [])
  
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={() => ({})}
          className='
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          '
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className='
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          '
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.photoURL} />
          </div>
        </div>
      </div>
      { isOpen && (
        <div
          className='
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          '
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label='My favorites'
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label='My reservations'
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label='My properties'
                />
                <hr />
                <MenuItem
                  onClick={logout}
                  label='Logout'
                />
              </>
            ):(
              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label='Login'
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label='Sign up'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu;