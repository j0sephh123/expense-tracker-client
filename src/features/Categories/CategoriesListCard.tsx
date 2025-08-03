import type { Category } from "../../types/category";

export default function CategoriesListCard({
  category,
}: {
  category: Category;
}) {
  return (
    <div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="text-lg font-medium text-gray-900 dark:text-white">
        {category.name}
      </div>
    </div>
  );
}
