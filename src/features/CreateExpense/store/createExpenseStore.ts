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

const defaults: Pick<
  CreateExpenseState,
  "selectedSubcategoryId" | "note" | "amount" | "selectionMethod"
> = Object.freeze({
  selectedSubcategoryId: null,
  note: "",
  amount: "",
  selectionMethod: "direct",
});

export const useCreateExpenseStore = create<CreateExpenseState>((set) => ({
  ...defaults,
  setSelectedSubcategoryId: (id) => set({ selectedSubcategoryId: id }),
  setNote: (note) => set({ note }),
  setAmount: (amount) => set({ amount }),
  setSelectionMethod: (method) => set({ selectionMethod: method }),
  reset: () => set(defaults),
}));
