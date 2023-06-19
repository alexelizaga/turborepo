'use client'

import { createContext, useContext, FC, useState, useEffect, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

type createContextProps = {
    currentUser: User | null;
    token: string | null;
}

export const AuthContext = createContext<createContextProps>({ currentUser: null, token: null });

export const useAuthContext = () => useContext(AuthContext);

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<User|null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                user.getIdToken().then((token) => {
                    setToken(token)
                })
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const memorizeValue = useMemo(() => ({ currentUser, token }), [token, currentUser]);

    return (
        <AuthContext.Provider value={memorizeValue}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};