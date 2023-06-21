import admin from '@/lib/firebase';

const db = admin.firestore();

export interface IListingsParams {
  userId?: string;
  category?: string;
}

export default async function getListings(
  params: IListingsParams
) {
  try {
    const { category } = params;

    let coursesRef: any = db.collection('courses');

    if (category) {
      coursesRef = db.collection('courses').where('categories', 'array-contains', category);
    }
    
    const snapshot = await coursesRef.get();

    if (snapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const listings: any[] = [];

    snapshot.forEach((doc: any) => {
      listings.push({ ...doc.data(), id: doc.id });
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}