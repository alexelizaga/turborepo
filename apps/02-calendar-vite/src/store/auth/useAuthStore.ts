import {
  loginWithEmailPassword,
  LoginWithEmailPasswordProps,
  logoutFirebase,
  registerUserWithEmailPassword,
  RegisterUserWithEmailPasswordProps,
  signInWithGoogle
} from "../../firebase/providers";
import { onCheckingCredentials, onLogin, onLogout, useAppSelector, useAppDispatch, useCalendarStore } from ".."


export const useAuthStore = () => {
  const dispatch = useAppDispatch();
  const { logoutCalendar } = useCalendarStore();
  const { displayName, email, errorMessage, photoURL, status, uid } = useAppSelector( store => store.auth );

  const startGoogleSignIn = async () => {
    checkingCredentials();

    const result = await signInWithGoogle();
    if ( !result.ok ) return logout( result );

    login(result);
  }

  const startCreatingUserWithEmailPassword = async ({ email, password, displayName }: RegisterUserWithEmailPasswordProps) => {
    checkingCredentials();

    const result = await registerUserWithEmailPassword({ email, password, displayName });
    
    if( !result.ok ) return logout( result );

    login(result);
  }

  const startLoginWithEmailPassword = async ({ email, password }: LoginWithEmailPasswordProps) => {
    checkingCredentials();

    const result = await loginWithEmailPassword({ email, password });
    
    if( !result.ok ) return logout( result );

    login(result);
  }

  const startLogout = async () => {
    await logoutFirebase();
    logoutCalendar()
    logout({});
  }

  const login = ({uid, email, displayName, photoUrl}: any) => {
    dispatch(onLogin({uid, email, displayName, photoUrl}));
  }

  const logout = (error: any) => {
    dispatch(onLogout(error));
  }

  const checkingAuthentication = () => {
    checkingCredentials();
  }

  const checkingCredentials = () => {
    dispatch( onCheckingCredentials() )
  }

  return {
    // Properties
    displayName,
    email,
    errorMessage,
    photoURL,
    status,
    uid,

    // Methods
    checkingAuthentication,
    login,
    startCreatingUserWithEmailPassword,
    startGoogleSignIn,
    startLoginWithEmailPassword,
    startLogout,
  }
}