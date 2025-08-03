
export default function Card({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      onClick={onClick}
    >
      <div className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </div>
    </div>
  );
}
