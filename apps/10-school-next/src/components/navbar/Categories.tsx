'use client';

import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { CategoryBox, Container } from '@/components';
import { CATEGORIES } from '@/constants/const';

const Categories: FC = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className='
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        '
      >
        {CATEGORIES.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            description={cat.description}
            icon={cat.icon}
            selected={category === cat.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories;