import ProductFilters from "@/features/products/ui/Filters";
import ProductList from "@/features/products/ui/ProductList";
import { Link, useSearchParams } from "react-router-dom";

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || "1");
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  return (
    <main className="max-w-7xl mx-auto p-6 sm:p-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            🚀👩‍🚀 Fast Store
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            This is the Home page. We'll mount the products-list feature here.
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <nav aria-label="quick links" className="text-sm">
            <Link
              to="/products/p1"
              className="text-indigo-600 hover:text-indigo-700 underline focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded"
            >
              Open Sample Product
            </Link>
            <span className="mx-2 text-gray-300">•</span>
            <Link
              to="/cart"
              className="text-indigo-600 hover:text-indigo-700 underline focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded"
            >
              Go to cart
            </Link>
            <span className="mx-2 text-gray-300">•</span>
            <Link
              to="/checkout"
              className="text-indigo-600 hover:text-indigo-700 underline focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded"
            >
              Checkout
            </Link>
          </nav>
        </div>
      </header>

      <section className="mt-6 space-y-6">
        <ProductFilters page={page} q={q} category={category} />
        <div>
          <h2 className="sr-only">Products</h2>
          <ProductList
            page={page}
            q={q}
            category={category}
            limit={4}
            infinite={true}
          />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
