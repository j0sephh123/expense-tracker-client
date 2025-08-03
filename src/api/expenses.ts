import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";
import type { Expense } from "../types/expense";
import { getDateString } from "../utils/date";

interface CreateExpenseRequest {
  amount: number;
  subcategory_id?: number;
  user_id?: number;
  note?: string;
}

interface CreateExpenseResponse {
  id: number;
  amount: number;
  message: string;
}

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CreateExpenseRequest
    ): Promise<CreateExpenseResponse> => {
      return api.post<CreateExpenseResponse>("/expenses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};

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
      } catch (error) {
        console.error("Failed to fetch today's expenses:", error);
        throw error;
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

export const useSubcategoryExpensesByMonth = (
  subcategoryId: number,
  month: Date
) => {
  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const dateFrom = getDateString(startOfMonth);
  const dateTo = getDateString(endOfMonth);

  const expensesQuery = useQuery({
    queryKey: [
      "expenses",
      "subcategory",
      subcategoryId,
      "month",
      dateFrom,
      dateTo,
    ],
    queryFn: async (): Promise<Expense[]> => {
      return api.get<Expense[]>(
        `/expenses?subcategory_id=${subcategoryId}&date_from=${dateFrom}&date_to=${dateTo}&order_by=date&order_dir=desc`
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const totalsQuery = useQuery({
    queryKey: [
      "expenses",
      "subcategory",
      subcategoryId,
      "month",
      dateFrom,
      dateTo,
      "totals",
    ],
    queryFn: async (): Promise<{ total_amount: number }> => {
      return api.get<{ total_amount: number }>(
        `/expenses?subcategory_id=${subcategoryId}&date_from=${dateFrom}&date_to=${dateTo}&aggregates_only=true`
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const getPreviousMonth = () => {
    return new Date(month.getFullYear(), month.getMonth() - 1, 1);
  };

  const getNextMonth = () => {
    return new Date(month.getFullYear(), month.getMonth() + 1, 1);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return {
    expenses: expensesQuery.data || [],
    total: totalsQuery.data?.total_amount || 0,
    isLoading: expensesQuery.isLoading || totalsQuery.isLoading,
    isError: expensesQuery.isError || totalsQuery.isError,
    error: expensesQuery.error || totalsQuery.error,
    getPreviousMonth,
    getNextMonth,
    formatMonthYear,
    currentMonth: month,
  };
};

export const useCategoryExpensesByMonth = (categoryId: number, month: Date) => {
  const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

  const dateFrom = getDateString(startOfMonth);
  const dateTo = getDateString(endOfMonth);

  const expensesQuery = useQuery({
    queryKey: ["expenses", "category", categoryId, "month", dateFrom, dateTo],
    queryFn: async (): Promise<Expense[]> => {
      return api.get<Expense[]>(
        `/expenses?category_id=${categoryId}&date_from=${dateFrom}&date_to=${dateTo}&order_by=date&order_dir=desc`
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const totalsQuery = useQuery({
    queryKey: [
      "expenses",
      "category",
      categoryId,
      "month",
      dateFrom,
      dateTo,
      "totals",
    ],
    queryFn: async (): Promise<{ total_amount: number }> => {
      return api.get<{ total_amount: number }>(
        `/expenses?category_id=${categoryId}&date_from=${dateFrom}&date_to=${dateTo}&aggregates_only=true`
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const getPreviousMonth = () => {
    return new Date(month.getFullYear(), month.getMonth() - 1, 1);
  };

  const getNextMonth = () => {
    return new Date(month.getFullYear(), month.getMonth() + 1, 1);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return {
    expenses: expensesQuery.data || [],
    total: totalsQuery.data?.total_amount || 0,
    isLoading: expensesQuery.isLoading || totalsQuery.isLoading,
    isError: expensesQuery.isError || totalsQuery.isError,
    error: expensesQuery.error || totalsQuery.error,
    getPreviousMonth,
    getNextMonth,
    formatMonthYear,
    currentMonth: month,
  };
};
