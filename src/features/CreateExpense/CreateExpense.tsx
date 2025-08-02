import { useCategories } from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";

export default function CreateExpense() {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Create Expense</h1>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="text-lg font-medium text-gray-900 dark:text-white">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
