import { Link } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-2">
        Order summary and place-order flow will be implemented here.
      </p>
      <div className="mt-4">
        <Link to="/" className="underline">
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default CheckoutPage;
