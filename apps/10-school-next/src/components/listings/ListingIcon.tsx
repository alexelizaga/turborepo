'use client';

import { FC } from 'react';
import { IconType } from 'react-icons';

interface CategoryBoxProps {
  icon: IconType;
}

const ListingIcon: FC<CategoryBoxProps> = ({
  icon: Icon,
}) => {

  return (
    <Icon size={24} />
  )
}

export default ListingIcon;