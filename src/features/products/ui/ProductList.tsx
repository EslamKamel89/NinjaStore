import { useProducts } from "../api/productsApi";
import ProductCard from "./ProductCard";

const ProductList: React.FC<{
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
}> = ({ page = 1, limit = 10, q, category }) => {
  const { data, isLoading, error, isError, isFetching } = useProducts({
    page,
    limit,
    q,
    category,
  });

  if (isLoading) {
    return <div>loading products....</div>;
  }
  if (isError) {
    return <div>Error loading products: {error.message}</div>;
  }
  const items = data?.items ?? [];
  return (
    <section>
      <div className="mb-2 text-sm text-gray-600">
        {isFetching ? "Refreshing…" : ""}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <ProductCard product={item} key={`product-${item.id}`} />
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Showing {items.length} of {data?.meta.total ?? 0} products.
      </div>
    </section>
  );
};

export default ProductList;
