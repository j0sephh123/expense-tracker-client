import PageWrapper from "../../shared/PageWrapper";
import type { Category } from "../../types/category";
import CategoriesList from "./CategoriesList";

export default function Categories() {
  const handleCategoryClick = (category: Category) => {
    console.log(category);
  };

  return (
    <PageWrapper title="Categories">
      <CategoriesList onClick={handleCategoryClick} />
    </PageWrapper>
  );
}
