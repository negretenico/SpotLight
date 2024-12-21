import { createContext, useState } from "react";
import { Nullish } from "../types/util";
import { User } from "../types/user";

type AuthContextType = {
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<Nullish<string>>>;
  token: Nullish<string>;
};
export const AuthContext = createContext<Nullish<AuthContextType>>(undefined);
export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<Nullish<string>>();
  const [user, setUser] = useState<Nullish<User>>(null);
  const contextValue = {
    isAuthenticated: !!token,
    setToken: setToken,
    token: token,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
