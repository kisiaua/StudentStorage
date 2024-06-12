import useAuth from "../hooks/useAuth.ts";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { auth } = useAuth();

  return auth?.jwtAccessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
