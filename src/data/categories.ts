export type Category = {
  id: string;
  title: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "cat-tiffin",
    title: "Tiffin",
    description: "South Indian breakfast items - dosas, idlis, and combos",
  },
  {
    id: "cat-biryani",
    title: "Biryani & Rice",
    description: "Authentic Hyderabadi biryanis and rice dishes",
  },
  {
    id: "cat-curries",
    title: "Curries",
    description: "Traditional curries and gravies",
  },
  {
    id: "cat-starters",
    title: "Starters",
    description: "Appetizers and snacks",
  },
  {
    id: "cat-beverages",
    title: "Beverages",
    description: "Fresh juices, lassi, and traditional drinks",
  },
];
