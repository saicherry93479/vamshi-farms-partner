export type OrderStatus = "preparing" | "ready" | "picked_up" | "delivered";

export type Order = {
  id: string;
  customer: string;
  items: string[];
  itemQuantities?: number[];
  total: number;
  status: OrderStatus;
  eta: string;
  rating?: number;
  orderTime?: string;
  createdAt?: string;
  complaint?: string;
};

export const orders: Order[] = [
  {
    id: "ORD-7574341755",
    customer: "Bobbili Sai Kumar",
    items: ["Breakfast Combo [Mini]"],
    itemQuantities: [1],
    total: 174,
    status: "delivered",
    eta: "Delivered",
    rating: 5,
    orderTime: "10:22 AM",
    createdAt: "13 December",
    complaint: "Delay in food handover",
  },
  {
    id: "ORD-1024",
    customer: "Aarav R.",
    items: ["Organic Paneer", "Farm Greens"],
    itemQuantities: [1, 1],
    total: 820,
    status: "preparing",
    eta: "12:45 PM",
    orderTime: "11:30 AM",
    createdAt: "14 December",
  },
  {
    id: "ORD-1025",
    customer: "Meera S.",
    items: ["Free-range Eggs", "A2 Milk"],
    itemQuantities: [1, 1],
    total: 640,
    status: "preparing",
    eta: "12:55 PM",
    orderTime: "11:45 AM",
    createdAt: "14 December",
    rating: 4,
  },
  {
    id: "ORD-1026",
    customer: "Nikhil D.",
    items: ["Cold-pressed Coconut Oil"],
    itemQuantities: [1],
    total: 420,
    status: "ready",
    eta: "Ready for pickup",
    orderTime: "10:00 AM",
    createdAt: "14 December",
  },
  {
    id: "ORD-1027",
    customer: "Riya P.",
    items: ["Raw Honey", "Heritage Rice"],
    itemQuantities: [1, 1],
    total: 980,
    status: "ready",
    eta: "Ready for pickup",
    orderTime: "09:30 AM",
    createdAt: "14 December",
    rating: 3,
    complaint: "Missing items",
  },
  {
    id: "ORD-1028",
    customer: "Karthik V.",
    items: ["Sprouted Dal Mix", "Seasonal Veg Box"],
    itemQuantities: [1, 1],
    total: 1150,
    status: "picked_up",
    eta: "Picked up",
    orderTime: "08:15 AM",
    createdAt: "14 December",
    rating: 5,
  },
];
