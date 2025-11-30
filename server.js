import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
// import {nanoid} from 'nanoid'
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PRODUCTS = [
  {
    id: "p1",
    title: "Minimalist Chair",
    slug: "minimalist-chair",
    description: "A comfortable minimalist chair for work and leisure.",
    price: 79.99,
    images: ["/images/chair-1.jpg"],
    category: "furniture",
    stock: 12,
    rating: 4.5,
  },
  {
    id: "p2",
    title: "Modern Lamp",
    slug: "modern-lamp",
    description: "A modern desk lamp with warm LED light.",
    price: 29.99,
    images: ["/images/lamp-1.jpg"],
    category: "lighting",
    stock: 34,
    rating: 4.2,
  },
  {
    id: "p3",
    title: "Soft Cotton T-Shirt",
    slug: "cotton-tshirt",
    description: "Breathable cotton T-shirt available in multiple sizes.",
    price: 19.99,
    images: ["/images/tshirt-1.jpg"],
    category: "apparel",
    stock: 120,
    rating: 4.7,
  },
  // add more products as needed...
];

const CATEGORIES = [
  { id: "c1", slug: "furniture", name: "Furniture" },
  { id: "c2", slug: "lighting", name: "Lighting" },
  { id: "c3", slug: "apparel", name: "Apparel" },
];

// Simple cart store (server memory). Structure: { items: [{ productId, qty }], updatedAt }
let CART = { items: [], updatedAt: Date.now() };

function paginate(items, page = 1, limit = 12) {
  const p = Math.max(1, Number(page));
  const l = Math.max(1, Number(limit));
  const start = (p - 1) * limit;
  return {
    items: items.slice(start, start + l),
    meta: {
      page: p,
      limit: l,
      total: items.length,
      pages: Math.ceil(items.length / l),
    },
  };
}
app.get("/health", (req, res) => {
  res.json({ ok: true, now: Date.now() });
});

app.get("/products", (req, res) => {
  const { q, category, page = 1, limit = 10 } = req.query;
  let results = PRODUCTS.slice();
  if (q) {
    const qLower = String(q).toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower) ||
        p.slug.toLowerCase().includes(qLower)
    );
  }
  if (category) {
    results = results.filter((p) => p.category === String(category));
  }
  const pageData = paginate(results, page, limit);
  return res.json(pageData);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const p = PRODUCTS.find(
    (x) => x.id === req.params.id || x.slug === req.params.id
  );
  if (!p) return res.status(404).json({ error: "product not found" });
  return res.json(p);
});

app.get("/categories", (req, res) => {
  return res.json(CATEGORIES);
});

app.get("/cart", (req, res) => {
  res.json(CART);
});

// POST /cart  - replace cart (body = { items: [{ productId, qty }] })
app.post("/cart", (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "invalid payload" });
  }
  CART.items = items.map((it) => ({
    productId: String(it.productId),
    qty: Math.max(0, Number(it.qty) || 0),
  }));
  CART.updatedAt = Date.now();
  res.json(CART);
});

// POST /cart/add - body { productId, qty }
app.post("/cart/add", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId) return res.status(400).json({ error: "Missing productId" });
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  const existing = CART.items.find((it) => it.productId === productId);
  if (existing)
    existing.qty = Math.min(product.stock, existing.qty + Number(qty));
  else
    CART.items.push({ productId, qty: Math.min(product.stock, Number(qty)) });
  CART.updatedAt = Date.now();
  res.json(CART);
});

// PATCH /cart/:productId - body { qty }
app.patch("/cart/:productId", (req, res) => {
  const { productId } = req.params;
  const { qty } = req.body;
  const item = CART.items.find((it) => it.productId === productId);
  if (!item) return res.status(404).json({ error: "Cart item not found" });
  item.qty = Math.max(0, Number(qty) || 0);
  if (item.qty === 0)
    CART.items = CART.items.filter((it) => it.productId !== productId);
  CART.updatedAt = Date.now();
  res.json(CART);
});

app.delete("/cart/:productId", (req, res) => {
  const { productId } = req.params;
  CART.items = CART.items.filter((it) => it.productId !== productId);
  CART.updatedAt = Date.now();
  res.json(CART);
});

// POST /order - body { customer: {...}, items: [...] }
app.post("/order", (req, res) => {
  const { customer, items } = req.body;
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "No items to place order" });

  const order = {
    id: nanoid(),
    createdAt: Date.now(),
    customer: customer || null,
    items,
    total: items.reduce((s, it) => {
      const product = PRODUCTS.find((p) => p.id === it.productId);
      return s + (product ? product.price * (it.qty || 1) : 0);
    }, 0),
  };

  CART = { items: [], updatedAt: Date.now() };

  res.status(201).json({ order });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Dummy e-commerce API running on http://localhost:${PORT}`);
});
