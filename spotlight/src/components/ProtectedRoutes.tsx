import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRoutesProps = { children: ReactElement };
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      return;
    }
    navigate("/login", { replace: true });
  }, [navigate, isAuthenticated]);
  return children;
}
