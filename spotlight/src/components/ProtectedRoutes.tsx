import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "./Sidebar";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../query/keys";
import { QUERY_FUNCTIONS } from "../query/functions";

type ProtectedRoutesProps = { children: ReactElement };
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isAuthenticated, token } = useAuth();
  useQuery({
    enabled: !!token,
    queryKey: QUERY_KEYS.user,
    queryFn: async () => await QUERY_FUNCTIONS.user(token ?? ""),
  });
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className={"flex"}>
      <Sidebar />
      {children}
      <div />
    </div>
  );
}
