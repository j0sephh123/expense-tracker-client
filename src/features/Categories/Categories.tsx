import { useCategories, useUpdateCategory } from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import type { Category } from "../../types/category";
import CategoryCard from "./CategoryCard";
import { RenameModal } from "../../shared/ActionModal/RenameModal";
import { useRenameModalStore } from "../../store/renameModalStore";
import PageWrapper from "../../shared/PageWrapper";
import { useNavigate } from "react-router";

export default function Categories() {
  const navigate = useNavigate();

  const handleViewDetails = (category: Category) => {
    navigate(`/categories/${category.id}`);
  };

  const handleViewExpenses = (category: Category) => {
    navigate(`/categories/${category.id}/expenses`);
  };
  const { data: categories = [], isLoading, error, refetch } = useCategories();
  const updateCategory = useUpdateCategory();
  const { open: openRenameModal } = useRenameModalStore();

  if (error) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleEditClick = (category: Category) => {
    openRenameModal(
      category.id,
      category.name,
      "category",
      async (id: number, name: string) => {
        await updateCategory.mutateAsync({ id, name });
        refetch();
      }
    );
  };

  return (
    <PageWrapper title="Categories">
      <div className="space-y-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            onClick={() => handleViewExpenses(category)}
            onEdit={() => handleEditClick(category)}
            onTitleClick={() => handleViewDetails(category)}
          />
        ))}

        <RenameModal />
      </div>
    </PageWrapper>
  );
}
