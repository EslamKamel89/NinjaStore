import { useProduct } from "@/features/products/api/productsApi";
import { Link, useParams } from "react-router-dom";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id);
  if (!id) {
    return <div className="p-6">No product id provided.</div>;
  }
  if (isError) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Product error</h2>
        <pre className="mt-2 p-3 bg-gray-50 rounded text-sm text-red-700">
          {String(error.message)}
        </pre>
      </div>
    );
  }
  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-extrabold">
        {product
          ? product.title
          : isLoading
          ? "Loading product..."
          : "Product not found"}
      </h1>

      <div className="mt-6 bg-white border border-gray-100 rounded-lg shadow-sm p-6">
        <p className="text-gray-700">{product?.description}</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
          <p className="sm:col-span-2">
            <strong className="font-medium">Price:</strong>{" "}
            <span className="ml-1">{product?.price.toFixed(2)}</span>
          </p>
          <p className="text-sm text-gray-600">
            <strong>Stock:</strong>{" "}
            <span className="ml-1">{product?.stock}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to="/"
          className="inline-block text-sm text-indigo-600 hover:text-indigo-700 underline focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default ProductPage;
