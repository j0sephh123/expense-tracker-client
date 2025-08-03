import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateCategory,
  useCreateSubcategory,
  useCategories,
} from "../../api/categories";
import PageWrapper from "../../shared/PageWrapper";

type CreateType = "category" | "subcategory";

export default function CreateCategory() {
  const [createType, setCreateType] = useState<CreateType>("category");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [error, setError] = useState("");

  const createCategory = useCreateCategory();
  const createSubcategory = useCreateSubcategory();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const navigate = useNavigate();

  const handleTypeChange = (type: CreateType) => {
    setCreateType(type);
    setName("");
    setCategoryId("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError(
        `${
          createType === "category" ? "Category" : "Subcategory"
        } name must be at least 2 characters long`
      );
      return;
    }

    if (createType === "subcategory" && categoryId === "") {
      setError("Please select a category");
      return;
    }

    try {
      if (createType === "category") {
        await createCategory.mutateAsync({ name: name.trim() });
      } else {
        await createSubcategory.mutateAsync({
          name: name.trim(),
          category_id: categoryId as number,
        });
      }
      navigate("/categories");
    } catch (err: unknown) {
      const error = err as { status?: number };
      if (error.status === 409) {
        if (createType === "category") {
          setError("A category with this name already exists");
        } else {
          setError(
            "A subcategory with this name already exists in the selected category"
          );
        }
      } else if (error.status === 404) {
        setError("Selected category not found");
      } else {
        setError(`Failed to create ${createType}. Please try again.`);
      }
    }
  };

  const isFormValid = () => {
    if (name.trim().length < 2) return false;
    if (createType === "subcategory" && categoryId === "") return false;
    return true;
  };

  const isSubmitting = createCategory.isPending || createSubcategory.isPending;

  return (
    <PageWrapper title="Create">
      <div className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Create Type
          </label>
          <div className="flex bg-gray-700 rounded-md p-1">
            <button
              type="button"
              onClick={() => handleTypeChange("category")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                createType === "category"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Category
            </button>
            <button
              type="button"
              onClick={() => handleTypeChange("subcategory")}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                createType === "subcategory"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Subcategory
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {createType === "subcategory" && (
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-200 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) =>
                  setCategoryId(e.target.value ? Number(e.target.value) : "")
                }
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200 mb-1"
            >
              {createType === "category" ? "Category" : "Subcategory"} Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`Enter ${createType} name`}
              minLength={2}
              required
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting || categoriesLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting
                ? "Creating..."
                : `Create ${
                    createType === "category" ? "Category" : "Subcategory"
                  }`}
            </button>

            <button
              type="button"
              onClick={() => navigate("/categories")}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
