import { AnyAction } from "@reduxjs/toolkit";

import { authSlice, onCheckingCredentials, onLogin, onLogout } from "./authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/authFixtures';

describe('Test authSlice', () => {
  test('should return initial state with auth name', () => {
    expect(authSlice.name).toBe('auth');

    const state = authSlice.reducer( initialState, {} as AnyAction );
    expect( state ).toEqual( initialState );
  });

  test('should authenticated', () => {
    const state = authSlice.reducer( initialState, onLogin( demoUser) );
    expect(state).toEqual(authenticatedState);
  });

  test('should logout', () => {
    const state = authSlice.reducer( authenticatedState, onLogout({}) );
    expect(state).toEqual(notAuthenticatedState);
  });

  test('should logout with error message', () => {
    const state = authSlice.reducer( authenticatedState, onLogout({ errorMessage: "wrong credentials" }) );
    const errorState = {
      ...notAuthenticatedState,
      errorMessage: "wrong credentials"
    }
    expect(state).toEqual(errorState);
  });

  test('should change to checking', () => {
    const state = authSlice.reducer( authenticatedState, onCheckingCredentials() );
    expect(state.status).toBe("checking");
  });
});