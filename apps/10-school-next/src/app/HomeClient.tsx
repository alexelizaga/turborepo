'use client';

import { Listing } from '@/types';
import { Container, ListingCard } from '@/components';


interface HomeClientProps {
  listings: Listing[];
}

const HomeClient = ({ listings }: HomeClientProps) => {
  return (
    <Container>
      <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              currentUser={undefined}
              data={listing}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default HomeClient