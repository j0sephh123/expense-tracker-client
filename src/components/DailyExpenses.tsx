import { useState } from "react";
import { useTodayExpenses, useDeleteExpense } from "../api/expenses";
import ErrorComponent from "../shared/ErrorComponent";
import Loading from "../shared/Loading";
import DayNavigation from "./DayNavigation";
import { formatDate, getIsToday, addDays, subtractDays } from "../utils/date";
import NoExpenses from "../shared/NoExpenses";
import Card from "../shared/Card/Card";
import TotalExpenses from "./TotalExpenses";
import { useDeleteModalStore } from "../store/deleteModalStore";

const DailyExpenses = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: expenses = [],
    isLoading,
    error,
  } = useTodayExpenses(selectedDate);

  const deleteExpense = useDeleteExpense();
  const { open: openDeleteModal } = useDeleteModalStore();

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
    openDeleteModal(expenseId, () => {
      deleteExpense.mutate(expenseId);
    });
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
            <Card
              key={expense.id}
              title={expense.subcategory_name || "Unknown"}
              subtitle={expense.category_name || "Unknown Category"}
              description={expense.note || undefined}
              amount={expense.amount}
              onEdit={() => handleEdit(expense.id)}
              onDelete={() => handleDelete(expense.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyExpenses;
