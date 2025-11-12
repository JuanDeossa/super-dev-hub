import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Dashboard, NotFound, AuthCallback } from "../pages";
import { PrivateRoute, PublicRoute, AppLayout } from ".";
import { useAuth } from "../hooks";

export const AppRouter = () => {
  const { user, handleLogin, handleLogout } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute user={user} />}>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/auth/callback" element={<AuthCallback user={user} />} />
        </Route>

        {/* Rutas privadas */}
        <Route element={<PrivateRoute user={user} />}>
          <Route element={<AppLayout user={user} onLogout={handleLogout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>

        {/* Redirección por defecto */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
