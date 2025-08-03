import { create } from "zustand";

interface RenameModalState {
  isOpen: boolean;
  itemId: number | null;
  itemName: string;
  itemType: "subcategory" | "category" | null;
  onConfirm: ((id: number, name: string) => Promise<void>) | null;
  open: (
    itemId: number,
    itemName: string,
    itemType: "subcategory" | "category",
    onConfirm: (id: number, name: string) => Promise<void>
  ) => void;
  close: () => void;
  setItemName: (name: string) => void;
}

export const useRenameModalStore = create<RenameModalState>((set) => ({
  isOpen: false,
  itemId: null,
  itemName: "",
  itemType: null,
  onConfirm: null,
  open: (itemId, itemName, itemType, onConfirm) =>
    set({ isOpen: true, itemId, itemName, itemType, onConfirm }),
  close: () =>
    set({
      isOpen: false,
      itemId: null,
      itemName: "",
      itemType: null,
      onConfirm: null,
    }),
  setItemName: (name) => set({ itemName: name }),
}));
