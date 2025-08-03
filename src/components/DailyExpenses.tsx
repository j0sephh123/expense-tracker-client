import { useState } from "react";
import { useTodayExpenses } from "../api/expenses";
import DayNavigation from "./DayNavigation";
import { formatDate, getIsToday, addDays, subtractDays } from "../utils/date";
import ExpensesList from "./ExpensesList";

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

  const navigationComponent = (
    <DayNavigation
      goToPreviousDay={goToPreviousDay}
      goToNextDay={goToNextDay}
      selectedDate={selectedDate}
      formatDate={formatDate}
      isToday={isToday}
    />
  );

  return (
    <ExpensesList
      expenses={expenses}
      isLoading={isLoading}
      isError={!!error}
      navigationComponent={navigationComponent}
    />
  );
};

export default DailyExpenses;
