import { useParams } from "react-router";
import { useCategory, useUpdateSubcategory } from "../../api/categories";
import PageWrapper from "../../shared/PageWrapper";
import type { Subcategory } from "../../types/category";
import Card from "../../shared/Card/Card";
import { ActionModal } from "../../shared/ActionModal";
import { useState } from "react";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: category, refetch } = useCategory(id || "");
  const updateSubcategory = useUpdateSubcategory();
  const [editingSubcategory, setEditingSubcategory] =
    useState<Subcategory | null>(null);
  const [editName, setEditName] = useState("");

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    console.log(subcategory);
  };

  const handleEditClick = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setEditName(subcategory.name);
  };

  const handleSaveEdit = async () => {
    if (editingSubcategory) {
      await updateSubcategory.mutateAsync({
        id: editingSubcategory.id,
        name: editName,
      });
      setEditingSubcategory(null);
      setEditName("");
      refetch();
    }
  };

  const handleCancelEdit = () => {
    setEditingSubcategory(null);
    setEditName("");
  };

  return (
    <PageWrapper title={category?.name || ""}>
      <div className="space-y-3">
        {category?.subcategories?.map((subcategory) => (
          <Card
            key={subcategory.id}
            title={subcategory.name}
            onClick={() => handleSubcategoryClick(subcategory)}
            onEdit={() => handleEditClick(subcategory)}
          />
        ))}
      </div>

      <ActionModal
        open={!!editingSubcategory}
        onCancel={handleCancelEdit}
        onConfirm={handleSaveEdit}
        title="Edit subcategory"
        confirmText="Save"
        cancelText="Cancel"
        variant="custom"
        loading={updateSubcategory.isPending}
      >
        <div className="space-y-4">
          <label className="block text-sm">
            <span className="text-gray-300">Name</span>
            <input
              aria-label="Subcategory name"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
            />
          </label>
        </div>
      </ActionModal>
    </PageWrapper>
  );
}
