import type { ReactNode } from "react";
import TotalExpenses from "./TotalExpenses";
import ExpenseCard from "./ExpenseCard";
import Loading from "../shared/Loading";
import ErrorComponent from "../shared/ErrorComponent";
import NoExpenses from "../shared/NoExpenses";
import { useDeleteModalStore } from "../store/deleteModalStore";
import { useDeleteExpense } from "../api/expenses";
import type { Expense } from "../types/expense";

interface ExpensesListProps {
  expenses: Expense[];
  isLoading: boolean;
  isError: boolean;
  navigationComponent: ReactNode;
  onEdit?: (expenseId: number) => void;
  onDelete?: (expenseId: number) => void;
}

export default function ExpensesList({
  expenses,
  isLoading,
  isError,
  navigationComponent,
  onEdit,
  onDelete,
}: ExpensesListProps) {
  const deleteExpense = useDeleteExpense();
  const { open: openDeleteModal } = useDeleteModalStore();

  const handleEdit = (expenseId: number) => {
    if (onEdit) {
      onEdit(expenseId);
    } else {
      console.log("Edit expense:", expenseId);
    }
  };

  const handleDelete = (expenseId: number) => {
    if (onDelete) {
      onDelete(expenseId);
    } else {
      openDeleteModal(expenseId, () => {
        deleteExpense.mutate(expenseId);
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
      {navigationComponent}

      {expenses.length > 0 && <TotalExpenses expenses={expenses} />}

      {expenses.length === 0 ? (
        <NoExpenses />
      ) : (
        <div className="space-y-2">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              title={expense.subcategory_name || "Unknown"}
              subtitle={expense.category_name || "Unknown Category"}
              description={expense.note || undefined}
              amount={expense.amount}
              onClick={() => handleEdit(expense.id)}
              onDelete={() => handleDelete(expense.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
