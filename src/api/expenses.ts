import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { Expense } from "../types/expense";

export const useTodayExpenses = () => {
  return useQuery({
    queryKey: ["expenses", "today"],
    queryFn: async (): Promise<Expense[]> => {
      const today = new Date().toISOString().split("T")[0];
      return api.get<Expense[]>(
        `/expenses?date_from=${today}&order_by=date&order_dir=desc`
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });
};

export const useExpenses = (params?: {
  user_id?: number;
  category_id?: number | number[];
  subcategory_id?: number | number[];
  date_from?: string;
  date_to?: string;
  order_by?: "amount" | "date";
  order_dir?: "asc" | "desc";
}) => {
  const queryParams = new URLSearchParams();

  if (params?.user_id !== undefined) {
    queryParams.append("user_id", params.user_id.toString());
  }

  if (params?.category_id) {
    const categoryIds = Array.isArray(params.category_id)
      ? params.category_id.join(",")
      : params.category_id.toString();
    queryParams.append("category_id", categoryIds);
  }

  if (params?.subcategory_id) {
    const subcategoryIds = Array.isArray(params.subcategory_id)
      ? params.subcategory_id.join(",")
      : params.subcategory_id.toString();
    queryParams.append("subcategory_id", subcategoryIds);
  }

  if (params?.date_from) {
    queryParams.append("date_from", params.date_from);
  }

  if (params?.date_to) {
    queryParams.append("date_to", params.date_to);
  }

  if (params?.order_by) {
    queryParams.append("order_by", params.order_by);
  }

  if (params?.order_dir) {
    queryParams.append("order_dir", params.order_dir);
  }

  const queryString = queryParams.toString();
  const endpoint = `/expenses${queryString ? `?${queryString}` : ""}`;

  return useQuery({
    queryKey: ["expenses", params],
    queryFn: async (): Promise<Expense[]> => {
      return api.get<Expense[]>(endpoint);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
