'use client';

import { FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from 'firebase/auth';

import { CATEGORIES } from '@/constants/const';
import { HeartButton, ListingIcon, ListingLogo } from '@/components';
import { Listing } from '@/types';

interface ListingCardProps {
  data: Listing;
  currentUser?: User | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  currentUser
}) => {
  const router = useRouter();

  const icons = useMemo(() => {
    let array: any[] = [];
    data.categories.forEach((tech: any) => {
      array = [ ...array, ...CATEGORIES.filter((c) => c.label === tech) ]
    });
    return array;
  }, [data]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className='
        col-span-1 cursor-pointer group
      '
    >
      <div className='flex flex-col gap-2 w-full'>
        <div
          className={`
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
            flex
            justify-center
            items-center
            ${data.color ? data.color : 'bg-neutral-300'}
          `}
        >
          { data.imageSrc && <Image
            fill
            alt='Listing'
            src={data.imageSrc}
            className='
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            '
          />}
          <div className='absolute top-3 right-3'>
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
          <div className='z-10'>
            <ListingLogo
              icon={icons[0].icon}
            />
          </div>
          
        </div>
        <div className='font-light text-2xl'>
          { data.title }
        </div>
        <div className='flex flex-row gap-3 text-neutral-500'>
          {
            icons.map((i: any) => (
              <ListingIcon key={i.label} icon={i.icon} />
            ))
          }
        </div>
        
      </div>
    </div>
  )
}

export default ListingCard;