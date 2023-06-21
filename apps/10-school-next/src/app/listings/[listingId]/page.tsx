'use client'

import React from 'react';

import { EmptyState } from '@/components';
import { Listing } from '@/types';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing: Listing[] = [];

  if (!listing ) {
    return (
      <EmptyState />
    )
  }

  return (
    <h1>Listing</h1>
  )
}

export default ListingPage;