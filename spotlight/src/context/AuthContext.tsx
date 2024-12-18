import { createContext, useState } from "react";
import { Nullish } from "../types/util";

type AuthContextType = {
  isAuthenticated: boolean;
  setToken: React.Dispatch<React.SetStateAction<Nullish<string>>>;
};
export const AuthContext = createContext<Nullish<AuthContextType>>(undefined);
export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<Nullish<string>>();
  // useLayoutEffect(() => {
  //   const interceptor = axiosInstance.interceptors.request.use((config) => {
  //     const withAuth = structuredClone(config);
  //     withAuth.headers.Authorization = token
  //       ? `Bearer ${token}`
  //       : config.headers.Authorization;
  //     return withAuth;
  //   });
  //   return () => {
  //     axiosInstance.interceptors.request.eject(interceptor);
  //   };
  // }, [token]);
  const contextValue = {
    isAuthenticated: !!token,
    setToken: setToken,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
