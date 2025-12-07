import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
// import {nanoid} from 'nanoid'
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PRODUCTS = [
  {
    id: "p4",
    title: "Ergonomic Office Desk",
    slug: "ergonomic-office-desk",
    description: "Spacious wooden desk designed for long work sessions.",
    price: 149.99,
    images: ["/images/desk-1.jpg"],
    category: "furniture",
    stock: 18,
    rating: 4.6,
  },
  {
    id: "p5",
    title: "Velvet Lounge Sofa",
    slug: "velvet-lounge-sofa",
    description: "A cozy velvet sofa that brings elegance to modern spaces.",
    price: 399.99,
    images: ["/images/sofa-1.jpg"],
    category: "furniture",
    stock: 7,
    rating: 4.8,
  },
  {
    id: "p6",
    title: "Wooden Coffee Table",
    slug: "wooden-coffee-table",
    description: "A sturdy handcrafted coffee table with natural wood finish.",
    price: 89.99,
    images: ["/images/coffee-table-1.jpg"],
    category: "furniture",
    stock: 22,
    rating: 4.4,
  },
  {
    id: "p7",
    title: "Adjustable Floor Lamp",
    slug: "adjustable-floor-lamp",
    description: "Tall adjustable lamp with soft ambient light.",
    price: 45.99,
    images: ["/images/floor-lamp-1.jpg"],
    category: "lighting",
    stock: 26,
    rating: 4.1,
  },
  {
    id: "p8",
    title: "Glass Pendant Light",
    slug: "glass-pendant-light",
    description: "Elegant glass pendant ideal for kitchens and dining rooms.",
    price: 59.99,
    images: ["/images/pendant-light-1.jpg"],
    category: "lighting",
    stock: 14,
    rating: 4.3,
  },
  {
    id: "p9",
    title: "LED Strip Lights",
    slug: "led-strip-lights",
    description: "Flexible LED strip lights perfect for decoration.",
    price: 24.99,
    images: ["/images/led-strip-1.jpg"],
    category: "lighting",
    stock: 50,
    rating: 4.6,
  },
  {
    id: "p10",
    title: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description: "Durable denim jacket with a timeless look.",
    price: 49.99,
    images: ["/images/denim-jacket-1.jpg"],
    category: "apparel",
    stock: 42,
    rating: 4.7,
  },
  {
    id: "p11",
    title: "Comfort Fit Jeans",
    slug: "comfort-fit-jeans",
    description: "Stretchable denim jeans designed for everyday comfort.",
    price: 39.99,
    images: ["/images/jeans-1.jpg"],
    category: "apparel",
    stock: 63,
    rating: 4.4,
  },
  {
    id: "p12",
    title: "Athletic Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes with breathable mesh.",
    price: 69.99,
    images: ["/images/shoes-1.jpg"],
    category: "apparel",
    stock: 37,
    rating: 4.8,
  },
  {
    id: "p13",
    title: "Leather Wallet",
    slug: "leather-wallet",
    description: "Genuine leather wallet with multiple compartments.",
    price: 24.99,
    images: ["/images/wallet-1.jpg"],
    category: "apparel",
    stock: 80,
    rating: 4.5,
  },
  {
    id: "p14",
    title: "Minimal Wall Shelf",
    slug: "minimal-wall-shelf",
    description: "Floating wall shelf for books, décor, and accessories.",
    price: 34.99,
    images: ["/images/wall-shelf-1.jpg"],
    category: "furniture",
    stock: 27,
    rating: 4.2,
  },
  {
    id: "p15",
    title: "Compact Bedside Table",
    slug: "bedside-table",
    description: "A compact and stylish table with a storage drawer.",
    price: 59.99,
    images: ["/images/bedside-table-1.jpg"],
    category: "furniture",
    stock: 19,
    rating: 4.3,
  },
  {
    id: "p16",
    title: "Hanging Wall Lamp",
    slug: "hanging-wall-lamp",
    description: "Vintage-style wall lamp with warm Edison bulb.",
    price: 39.99,
    images: ["/images/wall-lamp-1.jpg"],
    category: "lighting",
    stock: 20,
    rating: 4.4,
  },
  {
    id: "p17",
    title: "UltraSoft Hoodie",
    slug: "ultrasoft-hoodie",
    description: "Warm hoodie made from premium blended fabric.",
    price: 29.99,
    images: ["/images/hoodie-1.jpg"],
    category: "apparel",
    stock: 90,
    rating: 4.7,
  },
  {
    id: "p18",
    title: "Premium Knit Sweater",
    slug: "knit-sweater",
    description: "Cozy knit sweater ideal for winter weather.",
    price: 35.99,
    images: ["/images/sweater-1.jpg"],
    category: "apparel",
    stock: 48,
    rating: 4.6,
  },
  {
    id: "p19",
    title: "Modern Bookshelf",
    slug: "modern-bookshelf",
    description: "Tall bookshelf with five spacious wooden tiers.",
    price: 129.99,
    images: ["/images/bookshelf-1.jpg"],
    category: "furniture",
    stock: 10,
    rating: 4.5,
  },
  {
    id: "p20",
    title: "LED Desk Light",
    slug: "led-desk-light",
    description: "Energy-efficient LED light ideal for workstations.",
    price: 32.99,
    images: ["/images/desk-light-1.jpg"],
    category: "lighting",
    stock: 40,
    rating: 4.1,
  },
  {
    id: "p21",
    title: "Slim Fit Polo Shirt",
    slug: "slim-fit-polo",
    description: "Soft cotton polo shirt available in multiple colors.",
    price: 22.99,
    images: ["/images/polo-1.jpg"],
    category: "apparel",
    stock: 75,
    rating: 4.6,
  },
  {
    id: "p22",
    title: "Recliner Armchair",
    slug: "recliner-armchair",
    description: "Comfortable recliner chair perfect for relaxation.",
    price: 259.99,
    images: ["/images/armchair-1.jpg"],
    category: "furniture",
    stock: 6,
    rating: 4.7,
  },
  {
    id: "p23",
    title: "Hanging Ceiling Lantern",
    slug: "ceiling-lantern",
    description: "Rustic lantern-style ceiling light for warm ambiance.",
    price: 54.99,
    images: ["/images/lantern-1.jpg"],
    category: "lighting",
    stock: 17,
    rating: 4.4,
  },
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
