import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-error mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-base-content/70 mb-6 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-700 text-blue-100 font-semibold rounded-lg transition-colors duration-200 text-lg"
      >
        Go Home
      </button>
    </div>
  );
}
