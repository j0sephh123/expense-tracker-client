import { useCategories } from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import type { Category } from "../../types/category";
import CategoriesListCard from "./CategoriesListCard";

type Props = {
  onClick: (category: Category) => void;
};

export default function CategoriesList({ onClick }: Props) {
  const { data: categories = [], isLoading, error } = useCategories();

  if (error) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <CategoriesListCard
          key={category.id}
          category={category}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
