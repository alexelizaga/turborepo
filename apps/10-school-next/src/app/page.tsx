'use client'

import { Container, EmptyState, ListingCard } from "@/components";
import { useAuthContext } from "@/context/AuthContext";
import { Listing } from "@/types";
import axios from 'axios';

export default function Home() {
  const { token, currentUser } = useAuthContext();

  const listings: Listing[] = [
    {
      id: "64537a77c29ec22a3425f936",
      title: "Airbnb clone",
      description: "Descripción",
      imageSrc: "https://res.cloudinary.com/brocodejs/image/upload/v1683192421/bciehhgbmpu3nzumoxqg.jpg",
      categories: "Nextjs, Prisma, Tailwind",
      color: 'bg-blue-400'
    }
  ];

  // ADD A DOCUMENT
  // const handleForm = async () => {
  //   const data = {
  //     name: 'John snow',
  //     house: 'Stark'
  //   }
  //   const { result, error } = await addData('users', 'user-id', data)

  //   if (error) {
  //     return console.log(error)
  //   }
  // }

  const getUser = async () => {
    await axios.get(`/api/user`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }

  if (listings.length === 0) {
    return (
      <EmptyState showReset />
    )
  }

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
              currentUser={currentUser}
              data={listing}
            />
          )
        })}
      </div>
    </Container>
  )
}
