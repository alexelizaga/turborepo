'use client';

import React, { FC } from 'react';
import { IconType } from 'react-icons';

import { Avatar, ListingCategory } from '@/components';

interface ListingInfoProps {
  user: any;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  category?: {
    label: string;
    icon: IconType;
    description: string;
  };
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
  category
}) => {

  return (
    <div className='flex flex-col gap-8 col-span-4'>
      <div className='fle flex-col'>
        <div
          className='
            text-xl
            font-semibold
            flex flex-row
            items-center
            gap-2
          '
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className='
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500
          '
        >
          <div>
            {guestCount} guests
          </div>
          <div>
            {roomCount} rooms
          </div>
          <div>
            {bathroomCount} bathrooms
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-lg font-light text-neutral-500'>
        { description }
      </div>
    </div>
  )
}

export default ListingInfo;