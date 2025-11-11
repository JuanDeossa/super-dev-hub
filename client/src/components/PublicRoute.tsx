import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../types/user.types";

type Props = {
  user: User | null;
};

export const PublicRoute = ({ user }: Props) => {
  // Si ya hay usuario autenticado, redirige a dashboard
  if (user) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
};
