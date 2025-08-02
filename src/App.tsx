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
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-8 mb-8">
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8">Vite + React</h1>

        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-bg-secondary border border-border rounded-lg p-6 shadow-sm">
            <button
              onClick={() => setCount((count) => count + 1)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              count is {count}
            </button>
            <p className="mt-4 text-text-secondary text-center">
              Edit{" "}
              <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">
                src/App.tsx
              </code>{" "}
              and save to test HMR
            </p>
          </div>

          <div className="bg-bg-secondary border border-border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">API Health Check</h3>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isLoading ? "Checking..." : "Check Health"}
            </button>
            {healthData && (
              <p className="mt-4 text-green-600 dark:text-green-400 text-center">
                Status: {healthData.status}
              </p>
            )}
            {error && (
              <p className="mt-4 text-red-600 dark:text-red-400 text-center">
                Error:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
            )}
          </div>
        </div>

        <p className="text-center text-text-secondary mt-8">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  );
}

export default App;
