import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Cart</h1>
      <p className="mt-2">Cart items and edit controls go here.</p>
      <div className="mt-4">
        <Link to="/checkout" className="underline">
          Proceed to checkout
        </Link>
      </div>
    </main>
  );
};

export default CartPage;
