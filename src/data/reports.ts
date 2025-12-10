export type Metric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

export type ChartPoint = {
  name: string;
  orders: number;
  revenue: number;
};

export type SparkPoint = {
  name: string;
  value: number;
};

export type FunnelStep = {
  label: string;
  value: number;
  conversion: string;
};

export type ReportsData = {
  metrics: Metric[];
  chart: ChartPoint[];
  sparks: Record<string, SparkPoint[]>;
  funnel: FunnelStep[];
};

export const weeklyReport: ReportsData = {
  metrics: [
    { label: "Sales", value: "₹2.28L", change: "+8.4%", trend: "up" },
    { label: "Delivered Orders", value: "312", change: "+5.1%", trend: "up" },
    { label: "Avg Order Value", value: "₹730", change: "+2.2%", trend: "up" },
    { label: "Customer Experience", value: "4.7 / 5", change: "+0.2", trend: "up" },
  ],
  chart: [
    { name: "Mon", orders: 42, revenue: 29800 },
    { name: "Tue", orders: 55, revenue: 35200 },
    { name: "Wed", orders: 48, revenue: 33600 },
    { name: "Thu", orders: 52, revenue: 34800 },
    { name: "Fri", orders: 60, revenue: 41200 },
    { name: "Sat", orders: 40, revenue: 28600 },
    { name: "Sun", orders: 15, revenue: 9800 },
  ],
  sparks: {
    Sales: [
      { name: "Mon", value: 28 },
      { name: "Tue", value: 35 },
      { name: "Wed", value: 32 },
      { name: "Thu", value: 34 },
      { name: "Fri", value: 41 },
      { name: "Sat", value: 29 },
      { name: "Sun", value: 18 },
    ],
    "Delivered Orders": [
      { name: "Mon", value: 42 },
      { name: "Tue", value: 55 },
      { name: "Wed", value: 48 },
      { name: "Thu", value: 52 },
      { name: "Fri", value: 60 },
      { name: "Sat", value: 40 },
      { name: "Sun", value: 15 },
    ],
    "Avg Order Value": [
      { name: "Mon", value: 700 },
      { name: "Tue", value: 720 },
      { name: "Wed", value: 735 },
      { name: "Thu", value: 710 },
      { name: "Fri", value: 760 },
      { name: "Sat", value: 725 },
      { name: "Sun", value: 690 },
    ],
    "Customer Experience": [
      { name: "Mon", value: 4.5 },
      { name: "Tue", value: 4.6 },
      { name: "Wed", value: 4.7 },
      { name: "Thu", value: 4.6 },
      { name: "Fri", value: 4.8 },
      { name: "Sat", value: 4.7 },
      { name: "Sun", value: 4.6 },
    ],
  },
  funnel: [
    { label: "Views", value: 5600, conversion: "100%" },
    { label: "Adds to Cart", value: 2300, conversion: "41%" },
    { label: "Slot Selected", value: 1500, conversion: "65%" },
    { label: "Paid", value: 1248, conversion: "83%" },
    { label: "Picked Up", value: 1184, conversion: "95%" },
  ],
};

export const monthlyReport: ReportsData = {
  metrics: [
    { label: "Sales", value: "₹9.1L", change: "+12.8%", trend: "up" },
    { label: "Delivered Orders", value: "1,248", change: "+9.4%", trend: "up" },
    { label: "Avg Order Value", value: "₹755", change: "+1.6%", trend: "up" },
    { label: "Customer Experience", value: "4.8 / 5", change: "+0.3", trend: "up" },
  ],
  chart: [
    { name: "Week 1", orders: 290, revenue: 208000 },
    { name: "Week 2", orders: 320, revenue: 228000 },
    { name: "Week 3", orders: 305, revenue: 224500 },
    { name: "Week 4", orders: 333, revenue: 244200 },
  ],
  sparks: {
    Sales: [
      { name: "W1", value: 208 },
      { name: "W2", value: 228 },
      { name: "W3", value: 224 },
      { name: "W4", value: 244 },
    ],
    "Delivered Orders": [
      { name: "W1", value: 290 },
      { name: "W2", value: 320 },
      { name: "W3", value: 305 },
      { name: "W4", value: 333 },
    ],
    "Avg Order Value": [
      { name: "W1", value: 710 },
      { name: "W2", value: 740 },
      { name: "W3", value: 750 },
      { name: "W4", value: 780 },
    ],
    "Customer Experience": [
      { name: "W1", value: 4.6 },
      { name: "W2", value: 4.7 },
      { name: "W3", value: 4.8 },
      { name: "W4", value: 4.8 },
    ],
  },
  funnel: [
    { label: "Views", value: 21100, conversion: "100%" },
    { label: "Adds to Cart", value: 9100, conversion: "43%" },
    { label: "Slot Selected", value: 6100, conversion: "67%" },
    { label: "Paid", value: 4980, conversion: "82%" },
    { label: "Picked Up", value: 4720, conversion: "95%" },
  ],
};

