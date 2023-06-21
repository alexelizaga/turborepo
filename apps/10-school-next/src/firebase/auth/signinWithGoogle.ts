import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import firebase_app from "../config";


const auth = getAuth(firebase_app);
const googleProvider = new GoogleAuthProvider();

export default async function signInWithGoogle() {
    let result = null,
        error = null;
    try {
        result = await signInWithPopup(auth, googleProvider);
    } catch (e: any) {
        error = e;
    }

    return { result, error };
}
