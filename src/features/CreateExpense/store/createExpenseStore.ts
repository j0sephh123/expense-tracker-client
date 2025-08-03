import { create } from "zustand";

interface CreateExpenseState {
  selectedSubcategoryId: number | null;
  note: string;
  amount: string;
  selectionMethod: "direct" | "composite";
  setSelectedSubcategoryId: (id: number | null) => void;
  setNote: (note: string) => void;
  setAmount: (amount: string) => void;
  setSelectionMethod: (method: "direct" | "composite") => void;
  reset: () => void;
}

export const useCreateExpenseStore = create<CreateExpenseState>((set) => ({
  selectedSubcategoryId: null,
  note: "",
  amount: "",
  selectionMethod: "direct",
  setSelectedSubcategoryId: (id) => set({ selectedSubcategoryId: id }),
  setNote: (note) => set({ note }),
  setAmount: (amount) => set({ amount }),
  setSelectionMethod: (method) => set({ selectionMethod: method }),
  reset: () =>
    set({
      selectedSubcategoryId: null,
      note: "",
      amount: "",
      selectionMethod: "direct",
    }),
}));
