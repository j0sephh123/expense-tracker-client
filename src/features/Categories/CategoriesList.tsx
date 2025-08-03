import { useCategories } from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import type { Category } from "../../types/category";
import Card from "../../shared/Card/Card";

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
        <Card
          key={category.id}
          title={category.name}
          onClick={() => onClick(category)}
        />
      ))}
    </div>
  );
}
