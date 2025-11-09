import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ user }) => {
  // Si no hay usuario autenticado, redirige a login
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};
