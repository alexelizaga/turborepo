'use client'

import { createContext, useContext, FC, useState, useEffect, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

type createContextProps = {
    currentUser: User | null;
    token: string;
}

export const AuthContext = createContext<createContextProps>({ currentUser: null, token: '' });

export const useAuthContext = () => useContext(AuthContext);

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({
    children,
}) => {
    const [currentUser, setCurrentUser] = useState<User|null>(null);
    const [token, setToken] = useState<string>('');
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