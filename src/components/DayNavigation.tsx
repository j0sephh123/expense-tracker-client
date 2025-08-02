import ArrowButton from "./ArrowButton";

interface DayNavigationProps {
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  selectedDate: Date;
  isFuture: boolean;
  formatDate: (date: Date) => string;
}

export default function DayNavigation({
  goToPreviousDay,
  goToNextDay,
  selectedDate,
  isFuture,
  formatDate,
}: DayNavigationProps) {
  return (
    <div className="flex items-center space-x-2">
      <ArrowButton onClick={goToPreviousDay} direction="left" />
      <h2 className="text-xl font-bold text-gray-100">
        {formatDate(selectedDate)}'s Expenses
      </h2>
      <ArrowButton
        onClick={goToNextDay}
        direction="right"
        disabled={isFuture}
      />
    </div>
  );
}
