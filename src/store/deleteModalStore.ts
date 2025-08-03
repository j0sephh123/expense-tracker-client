import { create } from "zustand";

interface DeleteModalState {
  isOpen: boolean;
  itemId: number | null;
  itemType: "expense" | "category" | "subcategory" | null;
  itemName: string;
  onConfirm: (() => void) | null;
  open: (
    itemId: number,
    itemType: "expense" | "category" | "subcategory",
    itemName: string,
    onConfirm: () => void
  ) => void;
  close: () => void;
}

export const useDeleteModalStore = create<DeleteModalState>((set) => ({
  isOpen: false,
  itemId: null,
  itemType: null,
  itemName: "",
  onConfirm: null,
  open: (itemId, itemType, itemName, onConfirm) =>
    set({ isOpen: true, itemId, itemType, itemName, onConfirm }),
  close: () =>
    set({
      isOpen: false,
      itemId: null,
      itemType: null,
      itemName: "",
      onConfirm: null,
    }),
}));
