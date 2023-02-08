import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState('');
  const [role, setRole] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const loadInitialData = () => {
    const currentUser = localStorage.getItem('user');
    const currentRole = localStorage.getItem('role');
    if (currentUser !== undefined) {
      setUser(currentUser);
    }
    if (currentRole !== undefined) {
      setRole(currentRole);
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

  const setCurrentRole = (role) => {
    localStorage.setItem('role', role);
    setRole(role);
  };

  const removeCurrentRole = () => {
    localStorage.setItem('role', '');
    setRole('');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        hydrated,
        setCurrentUser,
        removeCurrentUser,
        setCurrentRole,
        removeCurrentRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
