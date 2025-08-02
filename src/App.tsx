import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { api } from "./utils/api";

interface HealthResponse {
  status: string;
  message?: string;
}

const fetchHealth = async (): Promise<HealthResponse> => {
  const response = await api.get<HealthResponse>("/health");
  return response;
};

function App() {
  const [count, setCount] = useState(0);

  const {
    data: healthData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    retry: 1,
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <h3>API Health Check</h3>
        <button onClick={() => refetch()} disabled={isLoading}>
          {isLoading ? "Checking..." : "Check Health"}
        </button>
        {healthData && (
          <p style={{ color: "green" }}>Status: {healthData.status}</p>
        )}
        {error && (
          <p style={{ color: "red" }}>
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
