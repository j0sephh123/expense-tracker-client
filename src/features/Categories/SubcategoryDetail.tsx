import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useSubcategoryExpensesByMonth } from "../../api/expenses";
import MonthNavigation from "../../components/MonthNavigation";
import TotalExpenses from "../../components/TotalExpenses";
import Card from "../../shared/Card/Card";
import Loading from "../../shared/Loading";
import ErrorComponent from "../../shared/ErrorComponent";
import NoExpenses from "../../shared/NoExpenses";

export default function SubcategoryDetail() {
  const { id, subcategoryId, month } = useParams();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  useEffect(() => {
    if (month) {
      const [year, monthNum] = month.split("-");
      if (year && monthNum) {
        setSelectedMonth(new Date(parseInt(year), parseInt(monthNum) - 1, 1));
      }
    }
  }, [month]);

  const {
    expenses,
    isLoading,
    isError,
    getPreviousMonth,
    getNextMonth,
    formatMonthYear,
  } = useSubcategoryExpensesByMonth(
    parseInt(subcategoryId || "0"),
    selectedMonth
  );

  const isCurrentMonth = () => {
    const now = new Date();
    return (
      selectedMonth.getMonth() === now.getMonth() &&
      selectedMonth.getFullYear() === now.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    const prevMonth = getPreviousMonth();
    const monthParam = `${prevMonth.getFullYear()}-${String(
      prevMonth.getMonth() + 1
    ).padStart(2, "0")}`;
    navigate(`/categories/${id}/${subcategoryId}/${monthParam}`);
  };

  const goToNextMonth = () => {
    const nextMonth = getNextMonth();
    const monthParam = `${nextMonth.getFullYear()}-${String(
      nextMonth.getMonth() + 1
    ).padStart(2, "0")}`;
    navigate(`/categories/${id}/${subcategoryId}/${monthParam}`);
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

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-700">
      <MonthNavigation
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
        selectedMonth={selectedMonth}
        formatMonth={formatMonthYear}
        isCurrentMonth={isCurrentMonth()}
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
}
