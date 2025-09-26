import { createContext, useContext, useState, useEffect } from "react";
import { getUser, logout } from "./authService";
import {  isLoggingOutAtom } from '../store/atom';
import { useAtomValue, useSetAtom } from 'jotai';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setIsLoggingOut = useSetAtom(isLoggingOutAtom);

  useEffect(() => {
    getUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
