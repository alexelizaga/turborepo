import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);

export default function getCurrentUser(): Promise<User|null> {

  // return onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     return user;
  //   } else {
  //     return null;
  //   }
  // });

  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      resolve(user)
    }, err => {
      reject(err)
    })
  })

  // return auth.currentUser;
}