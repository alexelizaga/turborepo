'use client'

import { createContext, useContext, FC, useState, useEffect, ReactNode, useMemo } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';

import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

type createContextProps = {
    user: User | null;
    token: string | null;
}

export const AuthContext = createContext<createContextProps>({ user: null, token: null });

export const useAuthContext = () => useContext(AuthContext);

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<User|null>(null);
    const [token, setToken] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                user.getIdToken().then((token) => {
                    setToken(token)
                })
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const memorizeValue = useMemo(() => ({ user, token }), [token, user]);

    return (
        <AuthContext.Provider value={memorizeValue}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};