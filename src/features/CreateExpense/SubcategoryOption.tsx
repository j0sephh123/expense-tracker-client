import type { SubcategoryExpenseCount } from "../../types/subcategory";

interface SubcategoryOptionProps {
  subcategory: SubcategoryExpenseCount;
}

export default function SubcategoryOption({
  subcategory,
}: SubcategoryOptionProps) {
  return (
    <option
      key={subcategory.subcategory_id}
      value={subcategory.subcategory_id}
      className="bg-gray-800 text-white"
    >
      {subcategory.subcategory_name}
    </option>
  );
}
