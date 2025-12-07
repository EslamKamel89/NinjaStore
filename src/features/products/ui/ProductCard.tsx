import type { Product } from "@/shared/types";
import { Link } from "react-router-dom";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <article className="border rounded p-4 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <div className="h-40 w-full bg-gray-100 rounded mb-3 flex items-center justify-center">
          {/* placeholder image / will wire public images later */}
          <span className="text-sm text-gray-500">Image</span>
          <h3 className="font-semibold text-lg">{product.title}</h3>
        </div>
      </Link>
      <p className="text-sm text-gray-600 mt-2 flex-1">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
        <div className="text-sm text-gray-500">stock: {product.stock}</div>
      </div>
    </article>
  );
};

export default ProductCard;
