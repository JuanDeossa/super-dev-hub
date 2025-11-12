import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user.types";

type Props = {
  user: User | null;
};

export const AuthCallback = ({ user }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>Procesando autenticación...</h2>
    </div>
  );
};
