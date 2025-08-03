import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { SubcategoryExpenseCount } from "../types/subcategory";

export const useSubcategoriesByExpenseCount = () => {
  return useQuery({
    queryKey: ["subcategories", "by-expense-count"],
    queryFn: async (): Promise<SubcategoryExpenseCount[]> => {
      return api.get<SubcategoryExpenseCount[]>(
        "/subcategories-by-expense-count"
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
