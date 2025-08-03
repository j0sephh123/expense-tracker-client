import { useCreateExpenseStore } from "./store/createExpenseStore";

type SelectionMethod = "direct" | "composite";

export default function SelectionToggle() {
  const { selectionMethod, setSelectionMethod } = useCreateExpenseStore();

  const handleMethodChange = (method: SelectionMethod) => {
    setSelectionMethod(method);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-2">
        Selection Method
      </label>
      <div className="flex bg-gray-700 rounded-md p-1">
        <button
          type="button"
          onClick={() => handleMethodChange("direct")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            selectionMethod === "direct"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Most popular
        </button>
        <button
          type="button"
          onClick={() => handleMethodChange("composite")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            selectionMethod === "composite"
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:text-white"
          }`}
        >
          Composite
        </button>
      </div>
    </div>
  );
}
