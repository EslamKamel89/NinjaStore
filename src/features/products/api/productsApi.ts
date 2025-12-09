import { api } from "@/shared/api/axios";
import type { Category, Pagination, Product } from "@/shared/types";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const PRODUCTS_QUERY_KEY = ["products"];
export const PRODUCTS_INFINITE_QUERY_KEY = ["products_infinite"];
export const PRODUCT_QUERY_KEY = ["product"];
export const CATEGORY_QUERY_KEY = ["categories"];

export function useProducts(params?: {
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
}) {
  const { page = 1, limit = 10, q, category } = params ?? {};
  return useQuery<Pagination<Product>>({
    queryKey: [...PRODUCTS_QUERY_KEY, { page, limit, q, category }],
    queryFn: async () => {
      const search = new URLSearchParams();
      search.set("page", String(page));
      search.set("limit", String(limit));
      if (q) search.set("q", String(q));
      if (category) search.set("category", String(category));
      const { data } = await api.get(`/products?${search.toString()}`);
      return data as Pagination<Product>;
    },
    staleTime: 60 * 1000,
  });
}
export function useProductsInfinite(params?: {
  limit?: number;
  q?: string;
  category?: string;
}) {
  const { limit = 10, q, category } = params ?? {};
  return useInfiniteQuery<Pagination<Product>>({
    queryKey: [...PRODUCTS_INFINITE_QUERY_KEY, { q, category }],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const search = new URLSearchParams();
      search.set("page", String(pageParam));
      search.set("limit", String(limit));
      if (q) search.set("q", String(q));
      if (category) search.set("category", String(category));
      const { data } = await api.get(`/products?${search.toString()}`);
      return data as Pagination<Product>;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.meta) return undefined;
      const { page, pages } = lastPage.meta;
      if (page < pages) return lastPage.meta.page + 1;
      return undefined;
    },
    staleTime: 1000 * 60,
  });
}

export function useProduct(id?: string) {
  return useQuery<Product>({
    queryKey: [...PRODUCT_QUERY_KEY, id],
    queryFn: async () => {
      if (!id) throw new Error("Missing product id");
      const { data } = await api.get(`/products/${id}`);
      return data as Product;
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: [...CATEGORY_QUERY_KEY],
    queryFn: async () => {
      const { data } = await api.get(`/categories`);
      return data as Category[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePrefetchProduct(id?: string) {
  const queryClient = useQueryClient();
  return () =>
    queryClient.prefetchQuery({
      queryKey: [...PRODUCT_QUERY_KEY, id],
      queryFn: async () => {
        if (!id) throw new Error("Missing product id");
        const { data } = await api.get(`/products/${id}`);
        return data as Product;
      },
      staleTime: 1000 * 60,
    });
}
