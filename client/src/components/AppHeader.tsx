export const AppHeader = ({ user, onLogout, isLoggingOut }) => {
  return (
    <header
      style={{
        width: "100%",
        background: "#222",
        color: "#fff",
        padding: "16px 32px",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        letterSpacing: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        borderBottom: "4px solid #646cff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p>{user?.email}</p>
      <button onClick={onLogout} disabled={isLoggingOut}>
        {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
      </button>
    </header>
  );
};
