import { getFirestore, doc, setDoc } from "firebase/firestore";

import firebase_app from "../config";


const db = getFirestore(firebase_app);

export default async function addData(colllection: string, id: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
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