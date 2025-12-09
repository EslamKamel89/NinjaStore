import type { Product } from "@/shared/types";
import { useProductsInfinite } from "../api/productsApi";
import ProductCard from "./ProductCard";

const InfiniteMode: React.FC<{
  limit: number;
  q?: string;
  category?: string;
}> = ({ limit, q, category }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductsInfinite({ limit, q, category });
  const items: Product[] = data ? data.pages.flatMap((p) => p.items) : [];
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {String((error as Error)?.message)}</div>;
  if (!data || items.length === 0) return <div>No products found</div>;
  return (
    <section>
      <div className="mb-2 text-sm text-gray-600">
        {isFetching ? "Refreshing…" : ""}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <ProductCard key={`product-${p.id}`} product={p} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="px-4 py-2 border rounded"
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load more"
            : "No more"}
        </button>
      </div>
    </section>
  );
};

export default InfiniteMode;
