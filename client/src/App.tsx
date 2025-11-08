import { useState } from "react";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    const url = `${import.meta.env.VITE_API_URL}/api/test`;

    try {
      setIsLoading(true);

      const response = await fetch(url);
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const btnLabel = isLoading ? "Loading..." : "Fetch";

  return (
    <>
      <h1>App</h1>
      <button onClick={handleFetch} disabled={isLoading}>
        {btnLabel}
      </button>
    </>
  );
}

export default App;
