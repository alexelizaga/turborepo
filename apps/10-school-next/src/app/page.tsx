'use client'

import { Container, EmptyState, ListingCard } from "@/components";
import { useAuthContext } from "@/context/AuthContext";
import { getListings } from "@/firebase/firestore";
import { IListingsParams } from "@/firebase/firestore/getListings";
import { Listing } from "@/types";
import axios from 'axios';
import { useEffect, useState } from "react";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = ({ searchParams }: HomeProps) => {
  const { token, currentUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([])

  useEffect(() => {
    getCourses();
  }, []);
  

  const getCourses = async () => {
    setListings(await getListings(searchParams));
    setLoading(false);
  }

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

  // GET USER FROM API
  // const getUser = async () => {
  //   return await axios.get(`/api/user`, {
  //     headers: {
  //       Authorization: 'Bearer ' + token
  //     }
  //   });
  // }

  if (listings.length === 0 && !loading) {
    return (
      <div className="m-10" onClick={getCourses}>
        <EmptyState showReset />
      </div>
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

export default Home;