import { queryClient } from "@/app/providers/queryClient";
import { api } from "@/shared/api/axios";
import type { Product } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

async function fetchProduct({
  queryKey,
}: {
  queryKey: (string | undefined)[];
}) {
  const [, id] = queryKey;
  const { data } = await api.get(`products/${id}`);
  return data as Product;
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
    enabled: Boolean(id),
    placeholderData: id
      ? ({
          id,
          title: "Loading…",
          slug: "",
          description: "",
          price: 0,
          images: [],
          category: "",
          stock: 0,
        } as Product)
      : undefined,
    initialData: () => {
      try {
        if (!id) return undefined;
        const allKeys = queryClient
          .getQueryCache()
          .getAll()
          .map((q) => q.queryKey);
        for (const key in allKeys) {
          if (Array.isArray(key) && key[0] === "products") {
            const pageData = queryClient.getQueryData<{ items: Product[] }>(
              key
            );
            if (pageData?.items) {
              const found = pageData.items.find((item) => item.id == id);
              if (found) return found;
            }
          }
        }
        return undefined;
      } catch {
        return undefined;
      }
    },
    select: (product) => product,
    staleTime: 1000 * 60 * 2,
  });
}
