import { FC, useReducer, ReactNode } from 'react';
import Cookies from 'js-cookie';

import { AuthContext, authReducer } from '@/context';
import { IUser } from '@/interfaces';
import { shopApi } from '@/api';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async ( email: string, password: string ): Promise<boolean> => {
    try {
      const { data } = await shopApi.post('/user/login', { email, password });
      const { user, token } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        // Methods
        loginUser,
        
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}