/**
 * This module provides the authorization context which keeps track of the state of
 * a users session on the application.
 */

import { createContext, useContext, useEffect, useState } from 'react';

//Creating the AuthContext
const AuthContext = createContext();

/**
 * Component containing this context's state and functions.
 * @param {*} children The components wrapped by this component.
 * @returns The provider of the AuthContext with the state and functions set.
 */
export function AuthProvider({ children }) {
  //The component state.
  const [user, setUser] = useState('');
  const [hydrated, setHydrated] = useState(false);

  /**
   * Gets data from localStorage and sets the component state accordingly.
   * Will run on mount through the useEffect hook below.
   */
  const loadInitialData = () => {
    const currentUser = localStorage.getItem('user');
    if (currentUser !== undefined) {
      setUser(currentUser);
    }
    setHydrated(true);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  /**
   * Sets the current user to the given user, both in local storage and in this component's state.
   * @param {*} user the given user.
   */
  const setCurrentUser = (user) => {
    localStorage.setItem('user', user);
    setUser(user);
  };

  /**
   * Clears the current user, both in local storage and in this component's state.
   */
  const removeCurrentUser = () => {
    localStorage.setItem('user', '');
    setUser('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        hydrated,
        setCurrentUser,
        removeCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook wrapping React's useContext hook, for usage of the state and functions in other components.
 * @returns The useContext hook given this AuthContext.
 */
export default function useAuth() {
  return useContext(AuthContext);
}
