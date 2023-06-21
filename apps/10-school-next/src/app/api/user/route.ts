import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import admin from '@/lib/firebase';

export async function GET () {
  const headersList = headers();
  const token = headersList.get("authorization")?.split(' ')[1];

  const user = await admin.auth().verifyIdToken(token || '');

  return NextResponse.json({ user });
}
