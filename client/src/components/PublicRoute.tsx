import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = ({ user }) => {
  // Si ya hay usuario autenticado, redirige a dashboard
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};
