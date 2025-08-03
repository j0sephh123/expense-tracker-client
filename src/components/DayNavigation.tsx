import ArrowButton from "./ArrowButton";

interface DayNavigationProps {
  goToPreviousDay: () => void;
  goToNextDay: () => void;
  selectedDate: Date;
  formatDate: (date: Date) => string;
  isToday: boolean;
}

export default function DayNavigation({
  goToPreviousDay,
  goToNextDay,
  selectedDate,
  formatDate,
  isToday,
}: DayNavigationProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-700 mb-4">
      <ArrowButton onClick={goToPreviousDay} direction="left" />
      <h2 className="text-gray-100">{formatDate(selectedDate)}</h2>
      <ArrowButton onClick={goToNextDay} direction="right" disabled={isToday} />
    </div>
  );
}
