import { collection, getFirestore, getDocs } from 'firebase/firestore/lite';

import firebase_app from "../config";

const db = getFirestore(firebase_app);

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const collectionRef = collection( db, `courses`);
    const docs = await getDocs(collectionRef);

    const listings: any[] = [];
  
    docs.forEach( doc => {
      listings.push({ ...doc.data(), id: doc.id });
    })

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}