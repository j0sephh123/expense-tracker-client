import type { Category } from "../../types/category";
import CategoriesList from "./CategoriesList";
import { useNavigate } from "react-router";

export default function Categories() {
  const navigate = useNavigate();

  const handleViewDetails = (category: Category) => {
    navigate(`/categories/${category.id}`);
  };

  const handleViewExpenses = (category: Category) => {
    navigate(`/categories/${category.id}/expenses`);
  };

  return (
    <CategoriesList
      onViewDetails={handleViewDetails}
      onViewExpenses={handleViewExpenses}
    />
  );
}
