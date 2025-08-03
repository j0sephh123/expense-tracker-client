import { create } from "zustand";

interface DeleteModalState {
  isOpen: boolean;
  expenseId: number | null;
  onConfirm: (() => void) | null;
  open: (expenseId: number, onConfirm: () => void) => void;
  close: () => void;
}

export const useDeleteModalStore = create<DeleteModalState>((set) => ({
  isOpen: false,
  expenseId: null,
  onConfirm: null,
  open: (expenseId, onConfirm) => set({ isOpen: true, expenseId, onConfirm }),
  close: () => set({ isOpen: false, expenseId: null, onConfirm: null }),
}));
