'use client'

import { useEffect, useState } from "react"
import { useLoginModal } from "@/hooks"
import { useAuthContext } from "@/context/AuthContext";
import axios from 'axios';

export default function Home() {
  const { user, token } = useAuthContext()
  const loginModal = useLoginModal();

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


  return (
    <>
      <h1>Home Page</h1>
      <button
        onClick={() => getUser()}
      >Get user</button>
    </>
  )
}
