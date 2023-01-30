import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { FirebaseAuth } from "../firebase/config";
import { useAuthStore } from "../store";


export const useCheckAuth = () => {
  const { login, startLogout } = useAuthStore();
  const { status } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged( FirebaseAuth, async(user: any) => {
      if ( !user ) return startLogout();
      login(user)
    })
  }, [])

  return status
}
