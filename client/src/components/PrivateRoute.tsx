import { Navigate, Outlet } from "react-router-dom";
import type { User } from "../types/user.types";

type Props = {
  user: User | null;
};

export const PrivateRoute = ({ user }: Props) => {
  // Si no hay usuario autenticado, redirige a login
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
};
