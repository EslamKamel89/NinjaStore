import HomePage from "@pages/HomePage";
import ProductPage from "@pages/ProductPage";
import SearchPage from "@pages/SearchPage";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
