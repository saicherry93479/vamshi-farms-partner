export type OrderStatus = "preparing" | "ready" | "picked_up";

export type Order = {
  id: string;
  customer: string;
  items: string[];
  itemQuantities?: number[];   // ✅ Added this
  total: number;
  status: OrderStatus;
  eta: string;
};

export const orders: Order[] = [
  {
    id: "ORD-1024",
    customer: "Aarav R.",
    items: ["Organic Paneer", "Farm Greens"],
    itemQuantities: [1, 1],   // ✅ added matching quantities
    total: 820,
    status: "preparing",
    eta: "12:45 PM",
  },
  {
    id: "ORD-1025",
    customer: "Meera S.",
    items: ["Free-range Eggs", "A2 Milk"],
    itemQuantities: [1, 1],
    total: 640,
    status: "preparing",
    eta: "12:55 PM",
  },
  {
    id: "ORD-1026",
    customer: "Nikhil D.",
    items: ["Cold-pressed Coconut Oil"],
    itemQuantities: [1],
    total: 420,
    status: "ready",
    eta: "Ready for pickup",
  },
  {
    id: "ORD-1027",
    customer: "Riya P.",
    items: ["Raw Honey", "Heritage Rice"],
    itemQuantities: [1, 1],
    total: 980,
    status: "ready",
    eta: "Ready for pickup",
  },
  {
    id: "ORD-1028",
    customer: "Karthik V.",
    items: ["Sprouted Dal Mix", "Seasonal Veg Box"],
    itemQuantities: [1, 1],
    total: 1150,
    status: "picked_up",
    eta: "Picked up",
  },
];
