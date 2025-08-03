import { useRenameModalStore } from "../../store/renameModalStore";
import { ActionModal } from "./index";
import { useState, useEffect } from "react";

export const RenameModal = () => {
  const { isOpen, itemId, itemName, itemType, onConfirm, close } =
    useRenameModalStore();
  const [localName, setLocalName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLocalName(itemName);
    }
  }, [isOpen, itemName]);

  const handleConfirm = async () => {
    if (!itemId || !onConfirm) return;

    setIsLoading(true);
    try {
      await onConfirm(itemId, localName);
      close();
    } catch (error) {
      console.error("Failed to rename item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    close();
  };

  const getTitle = () => {
    const itemTypeText =
      itemType === "subcategory" ? "subcategory" : "category";
    return `Edit ${itemTypeText}`;
  };

  return (
    <ActionModal
      open={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      title={getTitle()}
      confirmText="Save"
      cancelText="Cancel"
      variant="custom"
      loading={isLoading}
    >
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="text-gray-300">Name</span>
          <input
            aria-label={`${itemType} name`}
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500"
          />
        </label>
      </div>
    </ActionModal>
  );
};
