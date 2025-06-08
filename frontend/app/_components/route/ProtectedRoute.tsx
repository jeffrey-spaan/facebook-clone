'use client'

import { constants } from '@/app/_lib/constants'
import { useAuth } from '@/app/_context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push(constants.ROUTER_PATH.LOGIN);
    } else {
      // 👇 Automatisch uitloggen bij verlopen token
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000;

      if (Date.now() >= exp) {
        logout();
        router.push(constants.ROUTER_PATH.LOGIN);
      }
    }
  }, [token]);

  return token ? <>{children}</> : null;
};

export default ProtectedRoute;