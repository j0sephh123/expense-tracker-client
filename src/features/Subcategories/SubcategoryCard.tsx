interface SubcategoryCardProps {
  title: string;
  onClick?: () => void;
}

const SubcategoryCard = ({ title, onClick }: SubcategoryCardProps) => {
  const baseClasses = "rounded-lg border transition-colors duration-200";
  const simpleClasses =
    "p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer";

  return (
    <div
      className={`${baseClasses} relative ${simpleClasses}`}
      onClick={onClick}
    >
      <div className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </div>
    </div>
  );
};

export default SubcategoryCard;
