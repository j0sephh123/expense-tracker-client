import { useState, useEffect } from "react";
import { useCreateExpenseStore } from "./store/createExpenseStore";
import { useCategories } from "../../api/categories";
import type { SubcategoryExpenseCount } from "../../types/subcategory";

interface CompositePickerProps {
  subcategories: SubcategoryExpenseCount[];
}

export default function CompositePicker({
  subcategories,
}: CompositePickerProps) {
  const { selectedSubcategoryId, setSelectedSubcategoryId } =
    useCreateExpenseStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [availableSubcategories, setAvailableSubcategories] = useState<
    SubcategoryExpenseCount[]
  >([]);

  const { data: categories } = useCategories();

  useEffect(() => {
    if (selectedCategoryId) {
      const filtered = subcategories.filter(
        (sub) => sub.category_id === selectedCategoryId
      );
      setAvailableSubcategories(filtered);
      if (
        selectedSubcategoryId &&
        !filtered.some((sub) => sub.subcategory_id === selectedSubcategoryId)
      ) {
        setSelectedSubcategoryId(null);
      }
    } else {
      setAvailableSubcategories([]);
      if (selectedSubcategoryId) {
        setSelectedSubcategoryId(null);
      }
    }
  }, [selectedCategoryId, subcategories, selectedSubcategoryId]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId) {
      setSelectedCategoryId(parseInt(categoryId));
    } else {
      setSelectedCategoryId(null);
    }
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    if (subcategoryId) {
      setSelectedSubcategoryId(parseInt(subcategoryId));
    } else {
      setSelectedSubcategoryId(null);
    }
  };

  return (
    <div className="mb-4">
      <div className="mb-4">
        <label
          htmlFor="category-select"
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Category
        </label>
        <select
          id="category-select"
          value={selectedCategoryId || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
        >
          <option value="" className="bg-gray-800 text-white">
            Select a category
          </option>
          {categories?.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className="bg-gray-800 text-white"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="subcategory-select"
          className="block text-sm font-medium text-gray-200 mb-2"
        >
          Subcategory
        </label>
        <select
          id="subcategory-select"
          value={selectedSubcategoryId || ""}
          onChange={(e) => handleSubcategoryChange(e.target.value)}
          disabled={!selectedCategoryId}
          className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" className="bg-gray-800 text-white">
            {selectedCategoryId
              ? "Select a subcategory"
              : "Select a category first"}
          </option>
          {availableSubcategories.map((subcategory) => (
            <option
              key={subcategory.subcategory_id}
              value={subcategory.subcategory_id}
              className="bg-gray-800 text-white"
            >
              {subcategory.subcategory_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
