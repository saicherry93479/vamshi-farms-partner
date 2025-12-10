export type Category = {
  id: string;
  title: string;
  description: string;
};

export const categories: Category[] = [
  {
    id: "cat-dairy",
    title: "Dairy & Essentials",
    description: "A2 milk, cultured paneer, and probiotic curd from grass-fed cows.",
  },
  {
    id: "cat-produce",
    title: "Seasonal Produce",
    description: "Harvested within 12 hours, focused on greens and root vegetables.",
  },
  {
    id: "cat-pantry",
    title: "Pantry Staples",
    description: "Cold-pressed oils, wild honey, stone-ground flours, and heritage grains.",
  },
  {
    id: "cat-protein",
    title: "Proteins",
    description: "Free-range eggs and sprouted lentil mixes ready for weekly prep.",
  },
];

