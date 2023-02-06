import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = localStorage.getItem('user');
    if (currentUser) {
      setUser(currentUser);
    }
  });

  function login(username) {
    localStorage.setItem('user', username);
    setUser(username);
  }

  function logout() {
    localStorage.setItem('user', undefined);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
