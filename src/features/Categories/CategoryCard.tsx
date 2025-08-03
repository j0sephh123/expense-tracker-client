import { Edit } from "lucide-react";
import clsx from "clsx";
import IconButton from "../../shared/IconButton/IconButton";

interface CategoryCardProps {
  title: string;
  onClick: () => void;
  onEdit?: () => void;
  onTitleClick?: () => void;
}

const CategoryCard = ({
  title,
  onClick,
  onEdit,
  onTitleClick,
}: CategoryCardProps) => {
  const baseClasses = "rounded-lg border transition-colors duration-200";
  const simpleClasses =
    "p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer";

  return (
    <div
      className={clsx(
        baseClasses,
        "relative flex justify-between items-center",
        simpleClasses
      )}
    >
      <div
        className="text-lg font-medium text-gray-900 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
        onClick={onTitleClick}
      >
        {title}
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="px-3 py-1.5 rounded-md transition-colors text-xs font-medium bg-amber-700 text-amber-100"
        >
          Expenses
        </button>
        {onEdit && (
          <IconButton
            onClick={onEdit}
            variant="primary"
            title="Edit"
            icon={<Edit className="w-3.5 h-3.5" />}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
