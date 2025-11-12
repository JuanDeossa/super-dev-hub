import { useState } from "react";
import type { User } from "../types/user.types";

export const useAuth = () => {
  // Estado local de autenticación (simulado)
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = () => {
    const mockUser = {
      id: "1",
      name: "Usuario de Prueba",
      email: "usuario@prueba.com",
      provider: "google",
      role: "user",
      token: "fake-jwt-token",
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
  };

  // Llama a logoutMutation.mutate() para hacer logout
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    globalThis.location.href = `/login`;
  };

  return { user, handleLogout, handleLogin };
};
