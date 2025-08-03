import ArrowButton from "./ArrowButton";

interface MonthNavigationProps {
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
  selectedMonth: Date;
  formatMonth: (date: Date) => string;
  isCurrentMonth: boolean;
}

export default function MonthNavigation({
  goToPreviousMonth,
  goToNextMonth,
  selectedMonth,
  formatMonth,
  isCurrentMonth,
}: MonthNavigationProps) {
  return (
    <div className="flex items-center space-x-2 justify-between">
      <ArrowButton onClick={goToPreviousMonth} direction="left" />
      <h2 className="text-gray-100">{formatMonth(selectedMonth)}</h2>
      <ArrowButton onClick={goToNextMonth} direction="right" disabled={isCurrentMonth} />
    </div>
  );
} 