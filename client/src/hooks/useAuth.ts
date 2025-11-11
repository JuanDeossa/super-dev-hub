import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../helpers/toast";
import type { User } from "../types/user.types";

export const useAuth = () => {
  // Estado local de autenticación (simulado)
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const handleAuth = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Mutación para logout
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include", // Importante para enviar la cookie
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Error al cerrar sesión");
      }
      return res.json();
    },
    onSuccess: () => {
      setUser(null);
      localStorage.clear();
    },
    onError: (error) => {
      console.error("Error during logout:", error);
      toast.error("Error al cerrar sesión.");
    },
  });

  // Llama a logoutMutation.mutate() para hacer logout
  const handleLogout = () => {
    logout();
  };

  return { user, handleAuth, handleLogout, isLoggingOut };
};
