import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { Expense } from "../types/expense";
import { getDateString } from "../utils/date";

export const useTodayExpenses = (date?: Date) => {
  const targetDate = date || new Date();
  const dateString = getDateString(targetDate);

  return useQuery({
    queryKey: ["expenses", "today", dateString],
    queryFn: async (): Promise<Expense[]> => {
      try {
        return await api.get<Expense[]>(
          `/expenses?date_from=${dateString}&date_to=${dateString}&order_by=date&order_dir=desc`
        );
      } catch {
        console.log("API not available, using mock data for", dateString);
        const mockExpenses: Expense[] = [
          {
            id: 1,
            amount: 25.5,
            subcategory_id: 1,
            user_id: 1,
            note: "Lunch at the cafe",
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            category: {
              id: 1,
              name: "Food",
            },
            subcategory: {
              id: 1,
              name: "Restaurant",
              category_id: 1,
            },
          },
          {
            id: 2,
            amount: 15.0,
            subcategory_id: 2,
            user_id: 1,
            note: "Coffee and snacks",
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            category: {
              id: 1,
              name: "Food",
            },
            subcategory: {
              id: 2,
              name: "Coffee",
              category_id: 1,
            },
          },
          {
            id: 3,
            amount: 45.0,
            subcategory_id: 3,
            user_id: 1,
            note: "Gas station",
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            category: {
              id: 2,
              name: "Transport",
            },
            subcategory: {
              id: 3,
              name: "Fuel",
              category_id: 2,
            },
          },
        ];
        return mockExpenses;
      }
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
