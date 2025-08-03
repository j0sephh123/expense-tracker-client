import { useCategories, useUpdateCategory } from "../../api/categories";
import ErrorComponent from "../../shared/ErrorComponent";
import Loading from "../../shared/Loading";
import type { Category } from "../../types/category";
import Card from "../../shared/Card/Card";
import { ActionModal } from "../../shared/ActionModal";
import { useState } from "react";
import PageWrapper from "../../shared/PageWrapper";

type Props = {
  onViewDetails: (category: Category) => void;
  onViewExpenses: (category: Category) => void;
};

export default function CategoriesList({
  onViewDetails,
  onViewExpenses,
}: Props) {
  const { data: categories = [], isLoading, error, refetch } = useCategories();
  const updateCategory = useUpdateCategory();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");

  if (error) {
    return <ErrorComponent />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
  };

  const handleSaveEdit = async () => {
    if (editingCategory) {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        name: editName,
      });
      setEditingCategory(null);
      setEditName("");
      refetch();
    }
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditName("");
  };

  return (
    <PageWrapper title="Categories">
      <div className="space-y-3">
        {categories.map((category) => (
          <Card
            key={category.id}
            title={category.name}
            hoverActions={[
              {
                label: "View Details",
                onClick: () => onViewDetails(category),
                variant: "primary",
              },
              {
                label: "View Expenses",
                onClick: () => onViewExpenses(category),
                variant: "secondary",
              },
            ]}
            onEdit={() => handleEditClick(category)}
          />
        ))}

        <ActionModal
          open={!!editingCategory}
          onCancel={handleCancelEdit}
          onConfirm={handleSaveEdit}
          title="Edit category"
          confirmText="Save"
          cancelText="Cancel"
          variant="custom"
          loading={updateCategory.isPending}
        >
          <div className="space-y-4">
            <label className="block text-sm">
              <span className="text-gray-300">Name</span>
              <input
                aria-label="Category name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
              />
            </label>
          </div>
        </ActionModal>
      </div>
    </PageWrapper>
  );
}
