import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useCategoryExpensesByMonth } from "../../api/expenses";
import MonthNavigation from "../../components/MonthNavigation";
import ExpensesList from "../../components/ExpensesList";

export default function CategoryExpenses() {
  const { id, month } = useParams();
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
  } = useCategoryExpensesByMonth(parseInt(id || "0"), selectedMonth);

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
    navigate(`/categories/${id}/expenses/${monthParam}`);
  };

  const goToNextMonth = () => {
    const nextMonth = getNextMonth();
    const monthParam = `${nextMonth.getFullYear()}-${String(
      nextMonth.getMonth() + 1
    ).padStart(2, "0")}`;
    navigate(`/categories/${id}/expenses/${monthParam}`);
  };

  const navigationComponent = (
    <MonthNavigation
      goToPreviousMonth={goToPreviousMonth}
      goToNextMonth={goToNextMonth}
      selectedMonth={selectedMonth}
      formatMonth={formatMonthYear}
      isCurrentMonth={isCurrentMonth()}
    />
  );

  return (
    <ExpensesList
      expenses={expenses}
      isLoading={isLoading}
      isError={isError}
      navigationComponent={navigationComponent}
    />
  );
}
