import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { api } from "./utils/api";

interface HealthResponse {
  status: string;
  message?: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [healthStatus, setHealthStatus] = useState<string>("");
  const [healthError, setHealthError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    setHealthError("");
    setHealthStatus("");

    try {
      const response = await api.get<HealthResponse>("/health");
      setHealthStatus(response.status || "OK");
    } catch (error) {
      setHealthError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

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
        <button onClick={checkHealth} disabled={isLoading}>
          {isLoading ? "Checking..." : "Check Health"}
        </button>
        {healthStatus && (
          <p style={{ color: "green" }}>Status: {healthStatus}</p>
        )}
        {healthError && <p style={{ color: "red" }}>Error: {healthError}</p>}
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
