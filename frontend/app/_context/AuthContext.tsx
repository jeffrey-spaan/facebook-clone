'use client'

import { isTokenExpired } from '@/app/_lib/authUtils'
import { refresh } from '@/app/_lib/api/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { constants } from '@/app/_lib/constants'

interface AuthContextType {
  token: string | null;
  useAuthLogin: (token: string) => void;
  useAuthLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      if (isTokenExpired(token)) {
        const res = await refresh();
        const accessToken = res.accessToken;

        if (accessToken) {
          sessionStorage.setItem(constants.ACCESS_TOKEN, accessToken);
          setToken(accessToken);
        } else {
          // Optionally logout on refresh failure
          sessionStorage.removeItem(constants.ACCESS_TOKEN);
          setToken(null);
          router.push(constants.ROUTER_PATH.LOGIN);
        }
      }
    }, 60000); // check every 60 seconds

    return () => clearInterval(interval);
  }, [token, router]);

  const useAuthLogin = (newToken: string) => {
    sessionStorage.setItem(constants.ACCESS_TOKEN, newToken);
    setToken(newToken);
  };

  const useAuthLogout = () => {
    sessionStorage.removeItem(constants.ACCESS_TOKEN);
    setToken(null);
    router.push(constants.ROUTER_PATH.LOGIN);
  };

  return (
    <AuthContext.Provider value={{ token, useAuthLogin, useAuthLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};