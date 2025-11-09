import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>La ruta que intentaste acceder no existe.</p>
        <Link to="/login">Ir al login</Link>
      </div>
    </div>
  );
};
