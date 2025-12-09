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
    return <InfiniteMode limit={limit} q={q} category={category} />;
  }
  return <NormalMode page={page} limit={limit} q={q} category={category} />;
};

export default ProductList;
