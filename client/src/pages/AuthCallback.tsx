import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { CustomJwtPayload } from "../types/jwt";

export const AuthCallback = ({ onAuth }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("accessToken", token);
      try {
        const payload = jwtDecode<CustomJwtPayload>(token);
        onAuth({
          id: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role,
          provider: payload.provider,
          token: token,
        });
        navigate("/dashboard");
      } catch (err) {
        console.error("error de decodificación del token", err);
        localStorage.removeItem("accessToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate, onAuth]);

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h2>Procesando autenticación...</h2>
    </div>
  );
};
