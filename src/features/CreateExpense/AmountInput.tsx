import { useCreateExpenseStore } from "./store/createExpenseStore";

export default function AmountInput() {
  const { amount, setAmount } = useCreateExpenseStore();

  const handleReset = () => {
    setAmount("");
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="amount-input"
        className="block text-sm font-medium text-gray-200 mb-2"
      >
        Amount
      </label>
      <div className="relative">
        <input
          id="amount-input"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 pr-10 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
        />
        {amount && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
