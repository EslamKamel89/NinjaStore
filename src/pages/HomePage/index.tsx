import ProductList from "@/features/products/ui/ProductList";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">🚀👩‍🚀 Fast Store</h1>
      <p className="mt-2">
        This is the Home page. We'll mount the products-list feature here.
      </p>
      <ProductList />
      <div className="mt-4 space-x-3">
        <Link to="/products/p1" className="underline">
          Open Sample Product
        </Link>
        <Link to="/cart" className="underline">
          Go to cart
        </Link>
        <Link to="/checkout" className="underline">
          Checkout
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
