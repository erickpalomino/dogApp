import { createContext, useEffect, useState } from "react";

type AuthState = "authenticated" | "not-authenticated" | "checking";

type AuthContextProps = {
  authState: AuthState;
  token: string | null;
  signin: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setAuthState("not-authenticated");
    else setAuthState("authenticated");
  }, []);

  const signin = (token: string) => {
    localStorage.setItem("token", token);
    setAuthState("authenticated");
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState("not-authenticated");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ authState, token, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;