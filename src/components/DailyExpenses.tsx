import { useState } from "react";
import { useTodayExpenses, useDeleteExpense } from "../api/expenses";
import ErrorComponent from "../shared/ErrorComponent";
import Loading from "../shared/Loading";
import DayNavigation from "./DayNavigation";
import { formatDate, getIsToday, addDays, subtractDays } from "../utils/date";
import NoExpenses from "../shared/NoExpenses";
import Card from "../shared/Card/Card";
import TotalExpenses from "./TotalExpenses";
import { ActionModal } from "../shared/ActionModal";

const DailyExpenses = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);
  const {
    data: expenses = [],
    isLoading,
    error,
  } = useTodayExpenses(selectedDate);

  const deleteExpense = useDeleteExpense();

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
    setExpenseToDelete(expenseId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (expenseToDelete) {
      deleteExpense.mutate(expenseToDelete);
      setDeleteModalOpen(false);
      setExpenseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setExpenseToDelete(null);
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
      <ActionModal
        open={deleteModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        title="Delete Expense"
        description="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteExpense.isPending}
      />
    </div>
  );
};

export default DailyExpenses;
