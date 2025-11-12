type Props = {
  handleLogin: () => void;
};

export const Login = ({ handleLogin }: Props) => {
  const handleGoogleLogin = () => {
    handleLogin();
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
