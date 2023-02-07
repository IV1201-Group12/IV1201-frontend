import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [hydrated, setHydrated] = useState(false);

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

  const setCurrentUser = (username) => {
    localStorage.setItem('user', username);
    setUser(username);
  };

  const removeCurrentUser = () => {
    localStorage.setItem('user', '');
    setUser('');
  };

  return (
    <AuthContext.Provider
      value={{ user, hydrated, setCurrentUser, removeCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}