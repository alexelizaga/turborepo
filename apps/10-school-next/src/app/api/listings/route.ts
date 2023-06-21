import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export async function GET () {
  const coursesRef = db.collection('courses');
  const snapshot = await coursesRef.get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return [];
  }

  const listings: any[] = [];

  snapshot.forEach(doc => {
    listings.push({ ...doc.data(), id: doc.id });
  });

  return NextResponse.json(listings);
}
