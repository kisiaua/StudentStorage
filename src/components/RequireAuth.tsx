import useAuth from "../hooks/useAuth.ts";
import { Navigate, Outlet } from "react-router-dom";
import { UserRoles } from "../models/UserRoles.tsx";

interface RequireAuthProps {
  allowedRoles: UserRoles;
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { getUserRoles, isTokenExpired } = useAuth();
  const isRoleAllowed = getUserRoles().includes(allowedRoles);

  return isRoleAllowed && !isTokenExpired() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
