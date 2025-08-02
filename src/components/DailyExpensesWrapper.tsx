import { useState } from "react";
import { useTodayExpenses } from "../api/expenses";
import ErrorComponent from "../shared/ErrorComponent";
import Loading from "../shared/Loading";
import DayNavigation from "./DayNavigation";
import {
  formatDate,
  isToday,
  isFuture,
  addDays,
  subtractDays,
} from "../utils/date";
import NoExpenses from "../shared/NoExpenses";
import ExpenseCard from "./ExpenseCard";

const DailyExpensesWrapper = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: expenses = [],
    isLoading,
    error,
  } = useTodayExpenses(selectedDate);

  console.log("DailyExpensesWrapper:", {
    selectedDate: selectedDate.toISOString(),
    expenses,
    isLoading,
    error,
    expensesLength: expenses.length,
    isToday: isToday(selectedDate),
    isFuture: isFuture(selectedDate),
  });

  const goToPreviousDay = () => {
    setSelectedDate(subtractDays(selectedDate, 1));
  };

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleEdit = (expenseId: number) => {
    console.log("Edit expense:", expenseId);
  };

  const handleDelete = (expenseId: number) => {
    console.log("Delete expense:", expenseId);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  console.log("expenses", expenses);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <DayNavigation
          goToPreviousDay={goToPreviousDay}
          goToNextDay={goToNextDay}
          selectedDate={selectedDate}
          isFuture={isFuture(selectedDate)}
          formatDate={formatDate}
        />
        <div className="flex items-center space-x-3">
          {!isToday(selectedDate) && (
            <button
              onClick={goToToday}
              className="px-2 py-1 text-xs text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded transition-colors duration-200"
            >
              Today
            </button>
          )}
          {expenses.length > 0 && (
            <div className="text-right">
              <div className="text-xs text-gray-400">Total</div>
              <div className="text-xl font-bold text-green-400">
                {expenses
                  .reduce((sum, expense) => sum + expense.amount, 0)
                  .toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>

      {expenses.length === 0 ? (
        <NoExpenses />
      ) : (
        <div className="space-y-2">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyExpensesWrapper;
