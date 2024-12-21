import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "./Sidebar";

type ProtectedRoutesProps = { children: ReactElement };
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { isAuthenticated } = useAuth();
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
