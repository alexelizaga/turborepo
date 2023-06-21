import admin from '@/lib/firebase';

const auth = admin.auth();

export default async function getCurrentUser(token: string) {
  try {
    return await auth.verifyIdToken(token);
  } catch (error: any) {
    return null;
  }
}