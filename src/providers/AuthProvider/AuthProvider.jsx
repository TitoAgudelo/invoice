import React, { createContext, useEffect, useReducer, useContext } from 'react';
import { auth } from '../../firebase/firebase';

import { types, initialState, userReducer } from './state';

// Creates context
export const AuthContext = createContext();

// Auth provider that makes auth object and makes it available when calling useAuth()
const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Hook for child components to get access to the auth object
export const useAuth = () => useContext(AuthContext);

// Provider hook that creates auth object and handles state
const useAuthProvider = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signin = async (email, password) => {
    dispatch({ type: types.SIGNIN_REQ });

    try {
      const authUser = await auth.signInWithEmailAndPassword(email, password);
      dispatch({ type: types.SIGNIN_SUCCESS, payload: authUser });
    } catch (error) {
      console.error('Error signing in: ', error.message);
      dispatch({ type: types.SIGNIN_FAILED, payload: error.message });
    }
  };

  const signout = async () => {
    dispatch({ type: types.SIGNOUT_REQ });

    try {
      await auth.signOut();
      dispatch({ type: types.SIGNOUT_SUCCESS });
      // router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error.message);
      dispatch({ type: types.SIGNOUT_FAILED, payload: error.message });
    }
  };

  // Subscribes to auth user on mount
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (!userAuth) {
        dispatch({ type: types.IS_NOT_LOGGED_IN });
        // router.push('/');
      }

      // Unsubscribes to auth on unmount
      return () => unsubscribeFromAuth();
    });
  }, []);

  return { ...state, signin, signout };
};

export default AuthProvider;
