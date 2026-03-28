export type ProductColors = {
  id: string;
  name: string;
  hex: string;
  image: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  category: "shoes" | "clothing" | "accessories";
  image: string;
  colors: ProductColors[];
  sizes: string[];
  createdAt: string;
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "p-001",
    title: "Urban Canvas Sneakers",
    description:
      "Lace-up casual sneaker with a durable canvas upper and flexible rubber sole.",
    price: 1299,
    compareAtPrice: 1599,
    category: "shoes",
    rating: 4.7,
    reviewCount: 186,
    stock: 14,
    tags: ["Casual", "Lightweight", "Lace-up"],
    image: u("photo-1525966222134-fcfa99b8ae77"),
    colors: [
      {
        id: "black",
        name: "Black",
        hex: "#1a1a1a",
        image: u("photo-1549298916-b41d501d3772"),
      },
      {
        id: "off-white",
        name: "Off white",
        hex: "#f5f0e8",
        image: u("photo-1525966222134-fcfa99b8ae77"),
      },
      {
        id: "navy",
        name: "Navy",
        hex: "#1e2a4a",
        image: u("photo-1600185365928-3a27e50e93c0"),
      },
    ],
    sizes: ["40", "41", "42", "43", "44"],
    createdAt: "2025-11-02",
  },
  {
    id: "p-002",
    title: "Airy Running Trainers",
    description:
      "Lightweight runner with breathable mesh and cushioning for training.",
    price: 1899,
    compareAtPrice: 2299,
    category: "shoes",
    rating: 4.8,
    reviewCount: 312,
    stock: 20,
    tags: ["Running", "Breathable", "Sport"],
    image: u("photo-1608231387042-66d1773070a5"),
    colors: [
      {
        id: "gray",
        name: "Gray",
        hex: "#6b7280",
        image: u("photo-1595950653106-6c9ebd614d3a"),
      },
      {
        id: "blue",
        name: "Blue",
        hex: "#2563eb",
        image: u("photo-1608231387042-66d1773070a5"),
      },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    createdAt: "2025-10-28",
  },
  {
    id: "p-003",
    title: "Classic Leather Derbies",
    description:
      "Classic leather derby for the office and smart-casual occasions.",
    price: 2499,
    compareAtPrice: 2899,
    category: "shoes",
    rating: 4.5,
    reviewCount: 94,
    stock: 8,
    tags: ["Leather", "Formal", "Men's"],
    image: u("photo-1533869829740-14becdb6e04a"),
    colors: [
      {
        id: "brown",
        name: "Brown",
        hex: "#5c4033",
        image: u("photo-1616400638337-906a5f60a9f0"),
      },
      {
        id: "black",
        name: "Black",
        hex: "#171717",
        image: u("photo-1533869829740-14becdb6e04a"),
      },
    ],
    sizes: ["41", "42", "43", "44"],
    createdAt: "2025-09-15",
  },
  {
    id: "p-004",
    title: "Everyday Cotton Tee",
    description:
      "Soft cotton tee with a regular fit. Works year-round with jeans or shorts.",
    price: 349,
    compareAtPrice: 449,
    category: "clothing",
    rating: 4.6,
    reviewCount: 524,
    stock: 40,
    tags: ["Cotton", "Essential", "Summer"],
    image: u("photo-1521572163474-6864f9cf17ab"),
    colors: [
      {
        id: "white",
        name: "White",
        hex: "#f8fafc",
        image: u("photo-1521572163474-6864f9cf17ab"),
      },
      {
        id: "black",
        name: "Black",
        hex: "#1c1917",
        image: u("photo-1503341504253-dff4815485f1"),
      },
      {
        id: "slate",
        name: "Slate",
        hex: "#475569",
        image: u("photo-1583743814966-8936f5b7be1a"),
      },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    createdAt: "2025-08-01",
  },
  {
    id: "p-005",
    title: "Relaxed Fit Hoodie",
    description:
      "Relaxed hoodie with a zip front and soft interior for cooler days.",
    price: 899,
    compareAtPrice: 1099,
    category: "clothing",
    rating: 4.7,
    reviewCount: 203,
    stock: 22,
    tags: ["Hoodie", "Fall", "Fleece"],
    image: u("photo-1556821840-3a63f95609a7"),
    colors: [
      {
        id: "charcoal",
        name: "Charcoal",
        hex: "#374151",
        image: u("photo-1620799140408-edc6dcb6d633"),
      },
      {
        id: "sage",
        name: "Sage",
        hex: "#84a98c",
        image: u("photo-1578768079052-aa76e52ff575"),
      },
      {
        id: "oatmeal",
        name: "Oatmeal",
        hex: "#d6c8b8",
        image: u("photo-1556821840-3a63f95609a7"),
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    createdAt: "2025-10-05",
  },
  {
    id: "p-006",
    title: "Slim Chino Pants",
    description: "Slim chino with a neat silhouette. Pairs with a shirt or tee.",
    price: 749,
    category: "clothing",
    rating: 4.4,
    reviewCount: 156,
    stock: 18,
    tags: ["Chino", "Work", "Fall"],
    image: u("photo-1473966968600-fa801bee869a"),
    colors: [
      {
        id: "khaki",
        name: "Khaki",
        hex: "#b8a88c",
        image: u("photo-1473966968600-fa801bee869a"),
      },
      {
        id: "navy",
        name: "Navy",
        hex: "#1e3a5f",
        image: u("photo-1624378515195-6dbdb23fcf8d"),
      },
    ],
    sizes: ["30", "32", "34", "36"],
    createdAt: "2025-09-20",
  },
  {
    id: "p-007",
    title: "Lightweight Bomber Jacket",
    description: "Lightweight bomber for layering on evenings out.",
    price: 1599,
    compareAtPrice: 1899,
    category: "clothing",
    rating: 4.6,
    reviewCount: 88,
    stock: 11,
    tags: ["Bomber", "Outerwear", "Spring"],
    image: u("photo-1591047139829-d91aecb6caea"),
    colors: [
      {
        id: "olive",
        name: "Olive",
        hex: "#5c6148",
        image: u("photo-1551028719-00167b16eac5"),
      },
      {
        id: "black",
        name: "Black",
        hex: "#18181b",
        image: u("photo-1591047139829-d91aecb6caea"),
      },
    ],
    sizes: ["S", "M", "L", "XL"],
    createdAt: "2025-07-12",
  },
  {
    id: "p-008",
    title: "Crew Socks (3-pack)",
    description:
      "Cotton blend crew socks—comfortable for daily wear.",
    price: 199,
    category: "accessories",
    rating: 4.3,
    reviewCount: 412,
    stock: 60,
    tags: ["Socks", "Cotton", "Pack"],
    image: u("photo-1586350977771-b3b0abd50cee"),
    colors: [
      {
        id: "white",
        name: "White",
        hex: "#f4f4f5",
        image: u("photo-1586350977771-b3b0abd50cee"),
      },
      {
        id: "black",
        name: "Black",
        hex: "#27272a",
        image: u("photo-1642615835477-d31d6736e23d"),
      },
    ],
    sizes: ["39-42", "43-46"],
    createdAt: "2025-11-10",
  },
  {
    id: "p-009",
    title: "Crossbody Mini Bag",
    description:
      "Compact crossbody with adjustable strap for phone and wallet.",
    price: 649,
    compareAtPrice: 799,
    category: "accessories",
    rating: 4.5,
    reviewCount: 67,
    stock: 15,
    tags: ["Crossbody", "Vegan leather", "Practical"],
    image: u("photo-1548036328-c9fa89d128fa"),
    colors: [
      {
        id: "tan",
        name: "Tan",
        hex: "#c4a48a",
        image: u("photo-1548036328-c9fa89d128fa"),
      },
      {
        id: "black",
        name: "Black",
        hex: "#0a0a0a",
        image: u("photo-1590874103328-eac38a683ce7"),
      },
    ],
    sizes: ["One size"],
    createdAt: "2025-10-18",
  },
  {
    id: "p-010",
    title: "Wool Blend Beanie",
    description: "Warm wool-blend beanie. One size fits most.",
    price: 279,
    category: "accessories",
    rating: 4.4,
    reviewCount: 139,
    stock: 35,
    tags: ["Winter", "Beanie", "Warm"],
    image: u("photo-1576871337622-98d48d1cf531"),
    colors: [
      {
        id: "burgundy",
        name: "Burgundy",
        hex: "#722f37",
        image: u("photo-1576871337622-98d48d1cf531"),
      },
      {
        id: "cream",
        name: "Cream",
        hex: "#ebe5d9",
        image: u("photo-1630154630736-ce2bbf3aad20"),
      },
    ],
    sizes: ["One size"],
    createdAt: "2025-11-01",
  },
];
