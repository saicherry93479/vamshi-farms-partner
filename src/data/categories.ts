export type Category = {
  id: string;
  title: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "cat-vegetables",
    title: "Fresh Vegetables",
    description: "Farm-fresh organic vegetables",
  },
  {
    id: "cat-fruits",
    title: "Fresh Fruits",
    description: "Seasonal organic fruits",
  },
  {
    id: "cat-dairy",
    title: "Dairy & Eggs",
    description: "Fresh milk, curd, paneer & eggs",
  },
  {
    id: "cat-grains",
    title: "Grains & Pulses",
    description: "Organic rice, dal & millets",
  },
  {
    id: "cat-spices",
    title: "Spices & Masalas",
    description: "Pure organic spices & seasonings",
  },
  {
    id: "cat-oils",
    title: "Oils & Ghee",
    description: "Cold-pressed oils & pure ghee",
  },
  {
    id: "cat-snacks",
    title: "Organic Snacks",
    description: "Healthy organic snacks & namkeen",
  },
  {
    id: "cat-beverages",
    title: "Beverages",
    description: "Organic juices, tea & coffee",
  },
  {
    id: "cat-honey",
    title: "Honey & Jaggery",
    description: "Natural sweeteners",
  },
  {
    id: "cat-ready",
    title: "Ready to Cook",
    description: "Organic mixes & instant foods",
  },
];
