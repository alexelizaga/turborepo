import admin from 'firebase-admin';

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATEKEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }),
  });
} catch (error: any) {
  if (!/already exists/u.test(error?.message)) {
    console.error('Firebase admin initialization error', error?.stack)
  }
}

export default admin
