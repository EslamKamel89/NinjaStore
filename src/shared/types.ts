export interface Pagination<T> {
  items: T[];
  meta: { page: number; limit: number; total: number; pages: number };
}
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
}

export interface CartItem {
  productId: string;
  qty: number;
}

export interface CartState {
  items: CartItem[];
  updatedAt: number | null;
}

export interface Order {
  id: string;
  createdAt: number;
  customer?: { name?: string; email?: string };
  items: Array<{ productId: string; qty: number }>;
  total: number;
}
