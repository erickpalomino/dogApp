import { createContext, useEffect, useState } from "react";
import { axiosCustom } from "./axiosCustom";

type AuthState = "authenticated" | "not-authenticated" | "checking";
type UserType= "patient"|"doctor"|"unkown";

type AuthContextProps = {
  userType: UserType;
  authState: AuthState;
  token: string | null;
  signin: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [userType,setUserType]=useState<UserType>("unkown");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setAuthState("not-authenticated");
    else {
      axiosCustom.get(process.env.REACT_APP_API_URL+"/api/getUser")
      .then((response)=>{
        setUserType(response.data.data.type);
        setAuthState("authenticated");
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  }, []);

  const signin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    axiosCustom.get(process.env.REACT_APP_API_URL+"/api/getUser")
      .then((response)=>{
        setUserType(response.data.data.type);
        setAuthState("authenticated");
        console.log(response.data.data)
      })
      .catch((error)=>{
        console.log(error)
      })
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState("not-authenticated");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ userType,authState, token, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;