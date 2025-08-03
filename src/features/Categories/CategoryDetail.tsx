import { useNavigate, useParams } from "react-router";
import {
  useCategory,
  useUpdateSubcategory,
  useDeleteSubcategory,
} from "../../api/categories";
import type { Subcategory } from "../../types/category";
import SubcategoryCard from "../Subcategories/SubcategoryCard";
import { useRenameModalStore } from "../../store/renameModalStore";
import { useDeleteModalStore } from "../../store/deleteModalStore";

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: category, refetch: refetchCategory } = useCategory(id || "");
  const navigate = useNavigate();
  const { open: openRenameModal } = useRenameModalStore();
  const { open: openDeleteModal } = useDeleteModalStore();
  const updateSubcategory = useUpdateSubcategory();
  const deleteSubcategory = useDeleteSubcategory();

  const handleSubcategoryClick = (subcategory: Subcategory) => {
    navigate(`/categories/${id}/${subcategory.id}`);
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    openRenameModal(
      subcategory.id,
      subcategory.name,
      "subcategory",
      async (id: number, name: string) => {
        await updateSubcategory.mutateAsync({ id, name });
        refetchCategory();
      }
    );
  };

  const handleDeleteSubcategory = (subcategory: Subcategory) => {
    openDeleteModal(
      subcategory.id,
      "subcategory",
      subcategory.name,
      async () => {
        await deleteSubcategory.mutateAsync({ id: subcategory.id });
        refetchCategory();
      }
    );
  };

  return (
    <div className="space-y-4">
      {category?.subcategories?.map((subcategory) => {
        return (
          <SubcategoryCard
            key={subcategory.id}
            title={subcategory.name}
            onClick={() => handleSubcategoryClick(subcategory)}
            onEdit={() => handleEditSubcategory(subcategory)}
            onDelete={() => handleDeleteSubcategory(subcategory)}
            // TODO fix
            canDelete={false}
          />
        );
      })}
    </div>
  );
}
