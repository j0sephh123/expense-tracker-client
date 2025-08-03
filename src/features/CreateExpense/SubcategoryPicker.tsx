import type { SubcategoryExpenseCount } from "../../types/subcategory";
import { useCreateExpenseStore } from "./store/createExpenseStore";
import SubcategoryOption from "./SubcategoryOption";

interface SubcategoryPickerProps {
  subcategories: SubcategoryExpenseCount[];
}

export default function SubcategoryPicker({
  subcategories,
}: SubcategoryPickerProps) {
  const { selectedSubcategoryId, setSelectedSubcategoryId } =
    useCreateExpenseStore();
  return (
    <div className="mb-4">
      <label
        htmlFor="subcategory-select"
        className="block text-sm font-medium text-gray-200 mb-2"
      >
        Subcategory (sorted by most used)
      </label>
      <select
        id="subcategory-select"
        value={selectedSubcategoryId || ""}
        onChange={(e) => {
          const value = e.target.value;
          if (value) {
            setSelectedSubcategoryId(parseInt(value));
          } else {
            setSelectedSubcategoryId(null);
          }
        }}
        className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-white"
      >
        <option value="" className="bg-gray-800 text-white">
          Select a subcategory
        </option>
        {subcategories.map((subcategory) => (
          <SubcategoryOption
            key={subcategory.subcategory_id}
            subcategory={subcategory}
          />
        ))}
      </select>
    </div>
  );
}
