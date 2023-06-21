'use client';

import React, { FC } from 'react';
import Image from 'next/image';
import { User } from "firebase/auth";

import { Heading, HeartButton } from '@/components';

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  currentUser
}) => {

  return (
    <>
      <Heading
        title={title}
        subtitle={`subtitle`}
      />
      <div
        className='
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        '
      >
        <Image
          alt='Image'
          src={imageSrc}
          fill
          className='object-cover w-full'
        />
        <div className='absolute top-5 right-5'>
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead