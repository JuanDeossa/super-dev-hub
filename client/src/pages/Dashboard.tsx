import { useQuery } from "@tanstack/react-query";
import { UsersList } from "../components";

export const Dashboard = () => {
  const {
    data: users,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = "Error al obtener usuarios.";
        if (
          data?.error === "EXPIRED_TOKEN" &&
          typeof data.message === "string"
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          globalThis.location.href = `/login?error=${data.message}`;
        }

        throw new Error(errorMessage);
      }
      return data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div style={{ margin: "0" }}>
      <h2>Dashboard</h2>
      <UsersList
        users={users || []}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};
