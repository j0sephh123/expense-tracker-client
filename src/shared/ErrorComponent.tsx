import { AlertTriangle } from "lucide-react";

export default function ErrorComponent() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          Failed to load expenses
        </h3>
        <p className="text-gray-400 text-sm text-center max-w-sm">
          There was an error loading your expenses. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-700 text-blue-100 rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
