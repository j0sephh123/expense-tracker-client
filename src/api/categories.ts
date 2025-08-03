import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api";

interface Subcategory {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

interface SubcategoryDetail {
  id: number;
  name: string;
  category_id: number;
  category_name: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<Category[]> => {
      return await api.get<Category[]>("/categories");
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: async (): Promise<Category> => {
      return await api.get<Category>(`/categories/${id}`);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useSubcategory = (id: string) => {
  return useQuery({
    queryKey: ["subcategory", id],
    queryFn: async (): Promise<SubcategoryDetail> => {
      return await api.get<SubcategoryDetail>(`/subcategories/${id}`);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      return await api.put<{ message: string; id: number; name: string }>(
        `/categories/${id}`,
        { name }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      return await api.put<{ message: string; id: number; name: string }>(
        `/subcategories/${id}`,
        { name }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      return await api.post<{ id: number; name: string; message: string }>(
        `/categories`,
        { name }
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["category"] });
      queryClient.refetchQueries({ queryKey: ["subcategory"] });
    },
  });
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      category_id,
    }: {
      name: string;
      category_id: number;
    }) => {
      return await api.post<{
        id: number;
        name: string;
        category_id: number;
        message: string;
      }>(`/subcategories`, { name, category_id });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["category"] });
      queryClient.refetchQueries({ queryKey: ["subcategory"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await api.delete<{ message: string; id: number }>(
        `/categories/${id}`
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["category"] });
    },
  });
};

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      return await api.delete<{ message: string; id: number }>(
        `/subcategories/${id}`
      );
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["categories"] });
      queryClient.refetchQueries({ queryKey: ["category"] });
      queryClient.refetchQueries({ queryKey: ["subcategory"] });
    },
  });
};
