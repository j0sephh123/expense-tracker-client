import PageWrapper from "../../shared/PageWrapper";
import type { Category } from "../../types/category";
import CategoriesList from "../Categories/CategoriesList";

export default function CreateExpense() {
  const handleCategoryClick = (category: Category) => {
    console.log(category);
  };

  return (
    <PageWrapper title="Create Expense">
      <CategoriesList onClick={handleCategoryClick} />
    </PageWrapper>
  );
}
