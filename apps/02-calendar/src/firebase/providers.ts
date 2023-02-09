import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';

import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async(): Promise<Record<string, any>> => {
    try {
        const resp = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( resp );
        const { displayName, email, photoURL, uid  } = resp.user;

        return {
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
    } catch(error: any) {
        return { ok: false,  errorCode: error.code, errorMessage: error.message }
    }
}

export interface RegisterUserWithEmailPasswordProps {
    email: string,
    password: string,
    displayName: string
}

export const registerUserWithEmailPassword = async({ email, password, displayName }: RegisterUserWithEmailPasswordProps) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        await updateProfile( FirebaseAuth.currentUser!, { displayName } );

        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch ( error: any ) {
        return { ok: false,  errorCode: error.code, errorMessage: error.message }
    }
}

export interface LoginWithEmailPasswordProps {
    email: string,
    password: string
}

export const loginWithEmailPassword = async({ email, password }: LoginWithEmailPasswordProps) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            email, photoURL, uid, displayName
        }

    } catch ( error: any ) {
        return { ok: false,  errorCode: error.code, errorMessage: error.message }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}