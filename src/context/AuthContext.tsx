import React, { createContext, useContext, useEffect, useState } from "react";
import type { Role } from "../types/roles"; // or wherever you defined it

interface AuthData {
  accessToken: string;
  refreshToken: string;
  user: {
    username: string;
    role: Role;
  };
}

interface AuthContextType {
  auth: AuthData | null;
  login: (username: string, password: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


const USER_ROLE_MAP: Record<string, Role> = {
  admin: "ADMIN",
  institute: "INSTITUTE",
  jd: "JD",
  director: "DIRECTOR",
  secretary: "SECRETARY",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthData | null>(() => {
    const stored = localStorage.getItem("dhe-auth");
    return stored ? JSON.parse(stored) : null;
  });


  useEffect(() => {
    if (auth) localStorage.setItem("dhe-auth", JSON.stringify(auth));
    else localStorage.removeItem("dhe-auth");
  }, [auth]);

  const login = async (username: string, password: string) => {
    const role = USER_ROLE_MAP[username.toLowerCase()];

    if (!role) {
      throw new Error("Invalid credentials");
    }

    const mockAccess = "ACCESS_" + Date.now();
    const mockRefresh = "REFRESH_" + Date.now();

    setAuth({
      accessToken: mockAccess,
      refreshToken: mockRefresh,
      user: { username, role },
    });
  };

  const refresh = async () => {
    if (!auth) return;
    const newAccess = "ACCESS_" + Date.now();
    setAuth({ ...auth, accessToken: newAccess });
  };

  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
