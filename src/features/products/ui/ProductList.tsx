import InfiniteMode from "./InfiniteMode";
import NormalMode from "./NormalMode";

const ProductList: React.FC<{
  page?: number;
  limit?: number;
  q?: string;
  category?: string;
  infinite?: boolean;
}> = ({ page = 1, limit = 10, q, category, infinite = false }) => {
  if (infinite) {
    return (
      <div className="mt-4">
        <InfiniteMode limit={limit} q={q} category={category} />
      </div>
    );
  }
  return (
    <div className="mt-4">
      <NormalMode page={page} limit={limit} q={q} category={category} />
    </div>
  );
};

export default ProductList;
