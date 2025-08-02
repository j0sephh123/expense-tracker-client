import { formatTimeAgo } from "../utils/timeUtils";
import ArrowButton from "./ArrowButton";
import type { Expense } from "../types/expense";

interface DailyExpensesProps {
  expenses: Expense[];
  selectedDate: Date;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onGoToToday: () => void;
}

const DailyExpenses = ({
  expenses,
  selectedDate,
  onPreviousDay,
  onNextDay,
  onGoToToday,
}: DailyExpensesProps) => {
  console.log(selectedDate);

  const handleEdit = (expenseId: number) => {
    console.log("Edit expense:", expenseId);
  };

  const handleDelete = (expenseId: number) => {
    console.log("Delete expense:", expenseId);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const isFuture = selectedDate.toDateString() > new Date().toDateString();

  console.log({
    isToday,
    isFuture,
    selectedDate,
    today: new Date().toDateString(),
    selectedDateString: selectedDate.toDateString(),
  });

  const totalToday = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <ArrowButton onClick={onPreviousDay} direction="left" />
          <h2 className="text-xl font-bold text-gray-100">
            {formatDate(selectedDate)}'s Expenses
          </h2>
          <ArrowButton
            onClick={onNextDay}
            direction="right"
            disabled={isFuture}
          />
        </div>
        <div className="flex items-center space-x-3">
          {!isToday && (
            <button
              onClick={onGoToToday}
              className="px-2 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded transition-colors duration-200"
            >
              Today
            </button>
          )}
          <div className="text-right">
            <div className="text-xs text-gray-400">Total</div>
            <div className="text-xl font-bold text-green-400">
              ${totalToday.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-650 transition-colors duration-200"
          >
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
                  onClick={() => handleEdit(expense.id)}
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
                  onClick={() => handleDelete(expense.id)}
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
        ))}
      </div>
    </div>
  );
};

export default DailyExpenses;
