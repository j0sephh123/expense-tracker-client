import {
  useCategories,
  useUpdateCategory,
  useDeleteCategory,
} from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import type { Category } from "../../types/category";
import CategoryCard from "./CategoryCard";
import { useRenameModalStore } from "../../store/renameModalStore";
import { useDeleteModalStore } from "../../store/deleteModalStore";
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
  const deleteCategory = useDeleteCategory();
  const { open: openRenameModal } = useRenameModalStore();
  const { open: openDeleteModal } = useDeleteModalStore();

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

  const handleDeleteClick = (category: Category) => {
    openDeleteModal(category.id, "category", category.name, async () => {
      await deleteCategory.mutateAsync({ id: category.id });
      refetch();
    });
  };

  return (
    <PageWrapper title="Categories">
      <div className="space-y-4">
        {categories.map((category) => {
          const hasSubcategories =
            category.subcategories && category.subcategories.length > 0;

          return (
            <CategoryCard
              key={category.id}
              title={category.name}
              onClick={() => handleViewExpenses(category)}
              onEdit={() => handleEditClick(category)}
              onTitleClick={() => handleViewDetails(category)}
              onDelete={() => handleDeleteClick(category)}
              canDelete={!hasSubcategories}
            />
          );
        })}
      </div>
    </PageWrapper>
  );
}
