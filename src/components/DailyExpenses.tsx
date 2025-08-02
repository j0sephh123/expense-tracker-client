import { useState } from "react";
import { useTodayExpenses } from "../api/expenses";
import ErrorComponent from "../shared/ErrorComponent";
import Loading from "../shared/Loading";
import DayNavigation from "./DayNavigation";
import { formatDate, getIsToday, addDays, subtractDays } from "../utils/date";
import NoExpenses from "../shared/NoExpenses";
import ExpenseCard from "./ExpenseCard";
import TotalExpenses from "./TotalExpenses";

const DailyExpenses = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: expenses = [],
    isLoading,
    error,
  } = useTodayExpenses(selectedDate);

  const isToday = getIsToday(selectedDate);

  const goToPreviousDay = () => {
    setSelectedDate(subtractDays(selectedDate, 1));
  };

  const goToNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1));
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

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
      <DayNavigation
        goToPreviousDay={goToPreviousDay}
        goToNextDay={goToNextDay}
        selectedDate={selectedDate}
        formatDate={formatDate}
        isToday={isToday}
      />
      {expenses.length > 0 && <TotalExpenses expenses={expenses} />}

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

export default DailyExpenses;
