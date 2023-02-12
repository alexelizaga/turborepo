// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore/lite';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { getEnvironment } from '../helper';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} = getEnvironment();

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAnalytics = getAnalytics(FirebaseApp);
export const FirebaseAuth = getAuth(FirebaseApp);
// connectAuthEmulator(FirebaseAuth, "http://localhost:9099");
export const FirebaseDB = getFirestore(FirebaseApp);
// connectFirestoreEmulator(FirebaseDB, 'localhost', 8080);
const FirebaseStorage = getStorage();
// connectStorageEmulator(FirebaseStorage, "localhost", 9199);