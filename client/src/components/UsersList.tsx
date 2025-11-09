export const UsersList = ({ users, isLoading, error, refetch }) => {
  const showList = !isLoading && !error && users.length > 0;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "32px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Lista de usuarios</h3>
        <button onClick={refetch}>Refrescar</button>
      </div>

      {error ? <p>Error al cargar los usuarios: {error.message}</p> : null}

      {isLoading ? <p>Cargando usuarios...</p> : null}

      {users.length === 0 ? <p>No hay usuarios disponibles.</p> : null}

      {showList && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
