export const Login = () => {
  const handleGoogleLogin = () => {
    // Redirige al backend para iniciar OAuth con Google
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div style={{ maxWidth: 400, margin: "auto", padding: 32 }}>
        <h2>Iniciar sesión</h2>
        <button
          onClick={handleGoogleLogin}
          style={{ width: "100%", marginBottom: 16 }}
        >
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};
