import { useParams } from "react-router";

export default function SubcategoryDetail() {
  const { subcategoryId } = useParams();

  return (
    <div className="space-y-3">
      <div className="text-white">Subcategory ID: {subcategoryId}</div>
    </div>
  );
}
