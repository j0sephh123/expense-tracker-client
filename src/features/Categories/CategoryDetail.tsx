import { useParams } from "react-router";
import { useCategory } from "../../api/categories";
import PageWrapper from "../../shared/PageWrapper";
import type { Subcategory } from "../../types/category";
import Card from "../../shared/Card";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: category } = useCategory(id || "");

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    console.log(subcategory);
  };

  return (
    <PageWrapper title={category?.name || ""}>
      <div className="space-y-3">
        {category?.subcategories.map((subcategory) => (
          <Card
            key={subcategory.id}
            title={subcategory.name}
            onClick={() => handleSubcategoryClick(subcategory)}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
