import { formatTimeAgo } from "../utils/timeUtils";
import type { Expense } from "../types/expense";

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expenseId: number) => void;
  onDelete: (expenseId: number) => void;
}

const ExpenseCard = ({ expense, onEdit, onDelete }: ExpenseCardProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-650 transition-colors duration-200">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-100 text-sm truncate">
                {expense.subcategory?.name || "Unknown"}
              </span>
              <span className="text-xs text-gray-400">
                • {expense.category?.name || "Unknown Category"}
              </span>
            </div>
            {expense.note && (
              <p className="text-xs text-gray-300 mt-0.5 truncate">
                {expense.note}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-0.5">
              {formatTimeAgo(expense.created_at)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-2">
        <span className="text-sm font-bold text-green-400">
          {expense.amount.toFixed(2)}
        </span>
        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(expense.id)}
            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-gray-600 rounded transition-colors duration-200"
            title="Edit expense"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded transition-colors duration-200"
            title="Delete expense"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
