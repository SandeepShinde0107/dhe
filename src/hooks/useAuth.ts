import { useState, useEffect } from "react";
import type { Role } from "../types/roles";

type User = {
  username: string;
  role: Role | "string"
};

export type AuthData = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthData | null>(() => {
    const stored = sessionStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("auth");
    if (stored) {
      const parsed: AuthData = JSON.parse(stored);
      setAuth(parsed);
    }
  }, []);

  const login = (data: AuthData) => {
    sessionStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    setAuth(null);
  };

  const isAuthenticated = !!auth?.accessToken;
  const role = auth?.user?.role;

  return {
    auth,
    user: auth?.user || null,
    accessToken: auth?.accessToken || null,
    refreshToken: auth?.refreshToken || null,
    role,
    isAuthenticated,
    login,
    logout,
  };
}
