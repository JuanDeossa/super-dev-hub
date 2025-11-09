import { Outlet } from "react-router-dom";
import { AppHeader } from "./";

export const AppLayout = ({ user, onLogout, isLoggingOut }) => {
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
      <AppHeader user={user} isLoggingOut={isLoggingOut} onLogout={onLogout} />
      <main style={{ width: "100%", margin: "32px auto" }}>
        <Outlet />
      </main>
    </div>
  );
};
