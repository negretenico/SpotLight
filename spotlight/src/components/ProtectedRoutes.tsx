import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRoutesProps = { children: ReactElement };
export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const navigate = useNavigate();
  const token = null; // TODO: make this come from a auth provider that reads the cookie
  useEffect(() => {
    if (token) {
      return;
    }
    navigate("/login", { replace: true });
  }, [navigate, token]);
  return children;
}
