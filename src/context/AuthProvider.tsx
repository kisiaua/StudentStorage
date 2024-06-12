import { createContext, FC, ReactNode, useState } from "react";

type Auth = {
  email: string;
  password: string;
  jwtAccessToken: string;
};

interface ContextProps {
  auth: Auth | null;
  setAuth: (auth: Auth) => void;
}

const AuthContext = createContext<ContextProps>({
  auth: null,
  setAuth: () => null,
});

type Props = {
  children: ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
