import { Edit } from "lucide-react";
import IconButton from "../../shared/IconButton/IconButton";

interface CategoryCardProps {
  title: string;
  hoverActions?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "orange";
  }[];
  onEdit?: () => void;
}

const CategoryCard = ({ title, hoverActions, onEdit }: CategoryCardProps) => {
  const hasHoverActions = hoverActions && hoverActions.length > 0;

  const baseClasses = "rounded-lg border transition-colors duration-200";
  const simpleClasses =
    "p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-pointer";

  return (
    <div className={`${baseClasses} relative ${simpleClasses}`}>
      <div className="text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </div>

      {hasHoverActions && (
        <div className="flex gap-2 items-center justify-end">
          {hoverActions.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className={`px-3 py-1.5 rounded-md transition-colors text-xs font-medium ${
                action.variant === "secondary"
                  ? "bg-gray-600 text-gray-200"
                  : action.variant === "orange"
                  ? "bg-amber-700 text-amber-100"
                  : "bg-slate-600 text-slate-200"
              }`}
            >
              {action.label}
            </button>
          ))}
          {onEdit && (
            <IconButton
              onClick={onEdit}
              variant="primary"
              title="Edit"
              icon={<Edit className="w-3.5 h-3.5" />}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
