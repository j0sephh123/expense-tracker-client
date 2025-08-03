import PageWrapper from "../../shared/PageWrapper";
import type { Category } from "../../types/category";
import CategoriesList from "./CategoriesList";
import { useNavigate } from "react-router";

export default function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    navigate(`/categories/${category.id}`);
  };

  return (
    <PageWrapper title="Categories">
      <CategoriesList onClick={handleCategoryClick} />
    </PageWrapper>
  );
}
