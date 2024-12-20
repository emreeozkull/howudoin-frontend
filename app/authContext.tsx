// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  authJWT: string | null;
  setAuthJWT: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  authJWT: null,
  setAuthJWT: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Define state *inside* a component function
  const [authJWT, setAuthJWT] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ authJWT, setAuthJWT }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);