
// UUIDs fixes pour garder la cohérence des FK
const ID = {
  // users
  user1: "11111111-1111-1111-1111-000000000001",
  user2: "11111111-1111-1111-1111-000000000002",
  user3: "11111111-1111-1111-1111-000000000003",
  // categories
  cat1: "22222222-2222-2222-2222-000000000001",
  cat2: "22222222-2222-2222-2222-000000000002",
  cat3: "22222222-2222-2222-2222-000000000003",
  cat4: "22222222-2222-2222-2222-000000000004",
  // products
  prod1: "33333333-3333-3333-3333-000000000001",
  prod2: "33333333-3333-3333-3333-000000000002",
  prod3: "33333333-3333-3333-3333-000000000003",
  prod4: "33333333-3333-3333-3333-000000000004",
  prod5: "33333333-3333-3333-3333-000000000005",
  // cart items
  cart1: "44444444-4444-4444-4444-000000000001",
  cart2: "44444444-4444-4444-4444-000000000002",
  cart3: "44444444-4444-4444-4444-000000000003",
  // orders
  ord1: "55555555-5555-5555-5555-000000000001",
  ord2: "55555555-5555-5555-5555-000000000002",
  // order items
  oi1: "66666666-6666-6666-6666-000000000001",
  oi2: "66666666-6666-6666-6666-000000000002",
  oi3: "66666666-6666-6666-6666-000000000003",
  // favorites
  fav1: "77777777-7777-7777-7777-000000000001",
  fav2: "77777777-7777-7777-7777-000000000002",
  fav3: "77777777-7777-7777-7777-000000000003",
};

export const products = [
  {
    id: ID.prod1,
    name: "Chemise Oxford Slim",
    slug: "chemise-oxford-slim",
    description: "Chemise Oxford coupe slim, idéale pour le bureau ou les sorties.",
    price: 15000,
    category_id: ID.cat1,
    image_url: "/images/img-24.jpg",
    images: [
      { url: "/images/img-24.jpg", name: "Face", alt: "Veste face", width: 4000, height: 6000 },
      { url: "/images/img-11.jpg", name: "Face", alt: "Veste face", width: 3648, height: 3648 },
      { url: "/images/img-25.jpg", name: "Dos", alt: "Veste dos", width: 2339, height: 3508 }
    ],
    size: ["S", "M", "L", "XL"],
    color: ["#FFFFFF", "#679FFA", "#87CEEB"],
    stock: 45,
    is_new: true,
    is_promo: false,
    discount_price: null,
    discount_percentage: null,
  },
  {
    id: ID.prod2,
    name: "Robe Wax Imprimé",
    slug: "robe-wax-imprime",
    description: "Magnifique robe en tissu wax africain, coupe droite, col rond.",
    price: 22000,
    category_id: ID.cat2,
    image_url: "/images/img-31.jpg",
    images: [
      { url: "/images/img-31.jpg", name: "Face", alt: "Veste face", width: 3648, height: 3648 },
      { url: "/images/img-38.jpg", name: "Face", alt: "Veste face", width: 4160, height: 6240 },
      { url: "/images/img-33.jpg", name: "Dos", alt: "Veste dos", width: 2848, height: 4288 }
    ],
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["#FF6B6B", "#FFD600", "#E53935"],
    stock: 30,
    is_new: true,
    is_promo: true,
    discount_price: 18000,
    discount_percentage: 18,
  },
  {
    id: ID.prod3,
    name: "Sneakers Urban Runner",
    slug: "sneakers-urban-runner",
    description: "Sneakers légères et confortables pour un style urbain au quotidien.",
    price: 28000,
    category_id: ID.cat3,
    image_url: "/images/img-29.jpg",
    images: [
      { url: "/images/img-29.jpg", name: "Face", alt: "Veste face", width: 3386, height: 6020 },
      { url: "/images/img-27.jpg", name: "Face", alt: "Veste face", width: 3024, height: 4032 },
      { url: "/images/img-28.jpg", name: "Dos", alt: "Veste dos", width: 4160, height: 6240 }
    ],
    size: ["38", "39", "40", "41", "42", "43", "44"],
    color: ["#1A1A1A", "#FFFFFF", "#D4B896"],
    stock: 60,
    is_new: false,
    is_promo: true,
    discount_price: 23000,
    discount_percentage: 18,
  },
  {
    id: ID.prod4,
    name: "Sac Bandoulière Cuir",
    slug: "sac-bandouliere-cuir",
    description: "Sac bandoulière en cuir synthétique, compact et élégant.",
    price: 19500,
    category_id: ID.cat4,
    image_url: "/images/img-16.jpg",
    images: [
      { url: "/images-16.jpg", name: "Face", alt: "Veste face", width: 2935, height: 3894 },
      { url: "/images/img-21.jpg", name: "Face", alt: "Veste face", width: 4000, height: 6000 },
      { url: "/images/img-20.jpg", name: "Dos", alt: "Veste dos", width: 3712, height: 5568 }
    ],
    size: [],
    color: ["#795548", "#1A1A1A", "#C8864E"],
    stock: 20,
    is_new: false,
    is_promo: false,
    discount_price: null,
    discount_percentage: null,
  },
  {
    id: ID.prod5,
    name: "Polo Classic Fit",
    slug: "polo-classic-fit",
    description: "Polo en coton piqué, col boutonné, coupe classique confortable.",
    price: 12000,
    category_id: ID.cat1,
    image_url: "/images/img-39.jpg",
    images: [
      { url: "/images-39.jpg", name: "Face", alt: "Veste face", width: 2935, height: 3894 },
      { url: "/images/img-41.jpg", name: "Face", alt: "Veste face", width: 4000, height: 6000 },
      { url: "/images/img-40.jpg", name: "Dos", alt: "Veste dos", width: 3712, height: 5568 },
      { url: "/images/img-30.jpg", name: "Dos", alt: "Veste dos", width: 3712, height: 5568 }
    ],
    size: ["S", "M", "L", "XL"],
    color: ["#FFFFFF", "#1A237E", "#E53935", "#388E3C"],
    stock: 80,
    is_new: false,
    is_promo: false,
    discount_price: null,
    discount_percentage: null,
  },
];
export const users = [
  {
    id: ID.user1,
    full_name: "Kouassi Aya",
    email: "aya.kouassi@email.com",
    password_hash: "$2b$10$hashedpassword1",
    phone: "+22961000001",
    address: "Rue des Cocotiers, Akpakpa",
    city: "Cotonou",
    role: "customer",
  },
  {
    id: ID.user2,
    full_name: "Amédé Sossou",
    email: "amede.sossou@email.com",
    password_hash: "$2b$10$hashedpassword2",
    phone: "+22961000002",
    address: "Carrefour Godomey, Lot 45",
    city: "Cotonou",
    role: "customer",
  },
  {
    id: ID.user3,
    full_name: "Admin Principal",
    email: "admin@boutique.bj",
    password_hash: "$2b$10$hashedpassword3",
    phone: "+22961000003",
    address: "Zone Industrielle, Cotonou",
    city: "Cotonou",
    role: "admin",
  },
];

export const categories = [
  {
    id: ID.cat1,
    name: "Vêtements Hommes",
    slug: "vetements-hommes",
    description: "Chemises, pantalons, polos et tenues casual pour hommes",
  },
  {
    id: ID.cat2,
    name: "Vêtements Femmes",
    slug: "vetements-femmes",
    description: "Robes, jupes, blouses et tenues élégantes pour femmes",
  },
  {
    id: ID.cat3,
    name: "Chaussures",
    slug: "chaussures",
    description: "Sneakers, sandales, mocassins et chaussures de sport",
  },
  {
    id: ID.cat4,
    name: "Accessoires",
    slug: "accessoires",
    description: "Sacs, ceintures, montres et bijoux",
  },
];



export const cartItems = [
  {
    id: ID.cart1,
    user_id: ID.user1,
    product_id: ID.prod1,
    image_url: "/images/img-01.jpg",
    color: "Blanc",
    size: "M",
    quantity: 2,
  },
  {
    id: ID.cart2,
    user_id: ID.user1,
    product_id: ID.prod3,
    image_url: "/images/img-06.jpg",
    color: "Noir",
    size: "42",
    quantity: 1,
  },
  {
    id: ID.cart3,
    user_id: ID.user2,
    product_id: ID.prod2,
    image_url: "/images/img-04.jpg",
    color: "Jaune/Noir",
    size: "L",
    quantity: 1,
  },
];

export const orders = [
  {
    id: ID.ord1,
    user_id: ID.user1,
    total_amount: 58000,
    shipping_fee: 5000,
    status: "delivered",
    payment_method: "mobile_money",
    shipping_adress: {
      full_name: "Kouassi Aya",
      address: "Rue des Cocotiers, Akpakpa",
      city: "Cotonou",
      phone: "+22961000001",
    },
    address: "Rue des Cocotiers, Akpakpa, Cotonou",
    phone: "+22961000001",
  },
  {
    id: ID.ord2,
    user_id: ID.user2,
    total_amount: 27000,
    shipping_fee: 5000,
    status: "processing",
    payment_method: "mobile_money",
    shipping_adress: {
      full_name: "Amédé Sossou",
      address: "Carrefour Godomey, Lot 45",
      city: "Cotonou",
      phone: "+22961000002",
    },
    address: "Carrefour Godomey, Lot 45, Cotonou",
    phone: "+22961000002",
  },
];

export const orderItems = [
  {
    id: ID.oi1,
    order_id: ID.ord1,
    product_id: ID.prod1,
    quantity: 2,
    price_at_purchase: 15000,
    size: "M",
    image_url: "/images/img-01.jpg",
    color: "Blanc",
  },
  {
    id: ID.oi2,
    order_id: ID.ord1,
    product_id: ID.prod3,
    quantity: 1,
    price_at_purchase: 23000,
    size: "42",
    image_url: "/images/img-06.jpg",
    color: "Noir",
  },
  {
    id: ID.oi3,
    order_id: ID.ord2,
    product_id: ID.prod2,
    quantity: 1,
    price_at_purchase: 18000,
    size: "L",
    image_url: "/images/img-04.jpg",
    color: "Jaune/Noir",
  },
];

export const favorites = [
  { id: ID.fav1, user_id: ID.user1, product_id: ID.prod2 },
  { id: ID.fav2, user_id: ID.user1, product_id: ID.prod4 },
  { id: ID.fav3, user_id: ID.user2, product_id: ID.prod1 },
];

// ─────────────────────────────────────────────
//  HANDLER
// ─────────────────────────────────────────────
