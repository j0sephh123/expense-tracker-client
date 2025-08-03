import { useCategories } from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import CategoriesListCard from "./CategoriesListCard";

export default function CategoriesList() {
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
        <CategoriesListCard key={category.id} category={category} />
      ))}
    </div>
  );
}
