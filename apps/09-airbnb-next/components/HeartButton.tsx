'use client';

import { FC } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { SafeUser } from '@/types';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton:FC<HeartButtonProps> = ({
  listingId,
  currentUser
}) => {
  const hasFavorite = false;
  const toggleFavorite = () => {};

  return (
    <div
      onClick={toggleFavorite}
      className='
        relative
        hover:opacity-80
        transition
        cursor-pointer
      '
    >
      <AiOutlineHeart
        size={28}
        className='
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        '
      />
      <AiFillHeart
        size={24}
        className={`
          ${ hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
        `}
      />
    </div>
  )
}

export default HeartButton