'use client';

import { FC } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
}

const ListingLogo: FC<CategoryBoxProps> = ({
  icon: Icon,
}) => {

  return (
    <div className='bg-white rounded-full p-1'>
      <Icon size={80} />
    </div>
  )
}

export default ListingLogo;