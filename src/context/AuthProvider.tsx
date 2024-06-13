import { createContext, FC, ReactNode, useState } from "react";

type Auth = {
  email: string;
  password: string;
  jwtAccessToken: string;
};

interface ContextProps {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<ContextProps>({
  auth: null,
  setAuth: () => null,
  clearAuth: () => null,
});

type Props = {
  children: ReactNode;
};

const getAuthFromStorage = (): Auth | null => {
  const savedAuth = localStorage.getItem("auth");
  if (savedAuth) return JSON.parse(savedAuth);
  return null;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(getAuthFromStorage());

  const setAndSaveAuth = (auth: Auth) => {
    setAuth(auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  };

  const clearAuth = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ auth: auth, setAuth: setAndSaveAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
