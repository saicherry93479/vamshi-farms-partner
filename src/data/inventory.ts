export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  categoryId?: string;
  price: number;
  unit: string;
  inStock: boolean;
  image?: string;
};

export const inventory: InventoryItem[] = [
  {
    id: "INV-001",
    name: "A2 Cow Milk",
    category: "Dairy",
    categoryId: "cat-dairy",
    price: 120,
    unit: "liter",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "INV-002",
    name: "Free-range Eggs",
    category: "Protein",
    categoryId: "cat-protein",
    price: 12,
    unit: "egg",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "INV-003",
    name: "Cold-pressed Coconut Oil",
    category: "Pantry",
    categoryId: "cat-pantry",
    price: 480,
    unit: "500ml",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "INV-004",
    name: "Seasonal Veg Box",
    category: "Produce",
    categoryId: "cat-produce",
    price: 350,
    unit: "box",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "INV-005",
    name: "Raw Wild Honey",
    category: "Pantry",
    categoryId: "cat-pantry",
    price: 320,
    unit: "350g",
    inStock: false,
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "INV-006",
    name: "Heritage Red Rice",
    category: "Grains",
    categoryId: "cat-pantry",
    price: 180,
    unit: "kg",
    inStock: true,
    image:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&w=600&q=80",
  },
];

