'use client';
import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo: FC = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt="Logo"
      className='hidden md:block cursor-pointer'
      height="100"
      width="100"
      src="/images/logo.png"
    />
  )
}

export default Logo