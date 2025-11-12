import { Outlet } from "react-router-dom";
import { AppHeader } from "./";
import type { User } from "../types/user.types";

type Props = {
  user: User | null;
  onLogout: () => void;
};

export const AppLayout = ({ user, onLogout }: Props) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <AppHeader user={user} onLogout={onLogout} />
      <main style={{ width: "100%", margin: "32px auto" }}>
        <Outlet />
      </main>
    </div>
  );
};
