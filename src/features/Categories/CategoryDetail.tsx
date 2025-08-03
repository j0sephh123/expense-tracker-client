import { useNavigate, useParams } from "react-router";
import { useCategory } from "../../api/categories";
import type { Subcategory } from "../../types/category";
import SubcategoryCard from "../Subcategories/SubcategoryCard";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: category } = useCategory(id || "");
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    navigate(`/categories/${id}/${subcategory.id}`);
  };

  return (
    <div className="space-y-4">
      {category?.subcategories?.map((subcategory) => (
        <SubcategoryCard
          key={subcategory.id}
          title={subcategory.name}
          onClick={() => handleSubcategoryClick(subcategory)}
        />
      ))}
    </div>
  );
}
