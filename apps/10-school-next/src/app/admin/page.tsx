'use client'

import {useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/context/AuthContext";

const Admin = () => {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
      if (user == null) router.push("/")
  }, [router, user]);

  return (
    <h1>Only logged in users can view this page</h1>
  )
}

export default Admin;