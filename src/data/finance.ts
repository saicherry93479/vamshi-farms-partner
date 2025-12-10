export type PayoutStatus = "PAID" | "PENDING";

export type OrderBreakdown = {
  orderId: string;
  customer: string;
  amount: number;
  platformFee: number;
  commissionFee: number;
  netAmount: number;
  payoutDate?: string;

};

export type Payout = {
  id: string;
  netPayout: number;
  status: PayoutStatus;
  ordersCount: number;
  periodStart: string;
  periodEnd: string;
  creditedDate: string | null;
  orders: OrderBreakdown[];
  platformFeeTotal: number;
  commissionFeeTotal: number;
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  adjustments: number;
  refunds: number;
  grossAmount: number;
};

export type InvoiceStatus = "Generated" | "Pending";

export type Invoice = {
  id: string;
  month: string;
  year: number;
  status: InvoiceStatus;
  generatedDate: string | null;
};

export const payouts: Payout[] = [
  {
    id: "P-98234",
    netPayout: 84200.50,
    status: "PENDING",
    ordersCount: 142,
    periodStart: "2025-01-01",
    periodEnd: "2025-01-07",
    creditedDate: null,
    platformFeeTotal: 2840.00,
    commissionFeeTotal: 12630.00,
    gstAmount: 2774.00,
    cgstAmount: 1387.00,
    sgstAmount: 1387.00,
    adjustments: -500.00,
    refunds: -1200.00,
    grossAmount: 100000.50,
    orders: [
      {
        orderId: "ORD-1024",
        customer: "Aarav R.",
        amount: 820.00,
        platformFee: 24.60,
        commissionFee: 123.00,
        netAmount: 672.40,
      },
      {
        orderId: "ORD-1025",
        customer: "Meera S.",
        amount: 640.00,
        platformFee: 19.20,
        commissionFee: 96.00,
        netAmount: 524.80,
      },
      {
        orderId: "ORD-1026",
        customer: "Nikhil D.",
        amount: 420.00,
        platformFee: 12.60,
        commissionFee: 63.00,
        netAmount: 344.40,
      },
      {
        orderId: "ORD-1027",
        customer: "Riya P.",
        amount: 980.00,
        platformFee: 29.40,
        commissionFee: 147.00,
        netAmount: 803.60,
      },
      {
        orderId: "ORD-1028",
        customer: "Karthik V.",
        amount: 1150.00,
        platformFee: 34.50,
        commissionFee: 172.50,
        netAmount: 943.00,
      },
    ],
  },
  {
    id: "P-98212",
    netPayout: 76480.25,
    status: "PAID",
    ordersCount: 128,
    periodStart: "2024-12-25",
    periodEnd: "2024-12-31",
    creditedDate: "2025-01-06",
    platformFeeTotal: 2560.00,
    commissionFeeTotal: 11520.00,
    gstAmount: 2536.00,
    cgstAmount: 1268.00,
    sgstAmount: 1268.00,
    adjustments: 0.00,
    refunds: -800.00,
    grossAmount: 92000.25,
    orders: [
      {
        orderId: "ORD-1015",
        customer: "Tanvi D.",
        amount: 750.00,
        platformFee: 22.50,
        commissionFee: 112.50,
        netAmount: 615.00,
      },
      {
        orderId: "ORD-1016",
        customer: "Rahul M.",
        amount: 680.00,
        platformFee: 20.40,
        commissionFee: 102.00,
        netAmount: 557.60,
      },
      {
        orderId: "ORD-1017",
        customer: "Priya K.",
        amount: 920.00,
        platformFee: 27.60,
        commissionFee: 138.00,
        netAmount: 754.40,
      },
    ],
  },
  {
    id: "P-98199",
    netPayout: 68220.75,
    status: "PAID",
    ordersCount: 115,
    periodStart: "2024-12-18",
    periodEnd: "2024-12-24",
    creditedDate: "2025-01-02",
    platformFeeTotal: 2300.00,
    commissionFeeTotal: 10233.00,
    gstAmount: 2256.00,
    cgstAmount: 1128.00,
    sgstAmount: 1128.00,
    adjustments: -200.00,
    refunds: -600.00,
    grossAmount: 82000.75,
    orders: [
      {
        orderId: "ORD-1008",
        customer: "Sumeet B.",
        amount: 550.00,
        platformFee: 16.50,
        commissionFee: 82.50,
        netAmount: 451.00,
      },
      {
        orderId: "ORD-1009",
        customer: "Anjali S.",
        amount: 720.00,
        platformFee: 21.60,
        commissionFee: 108.00,
        netAmount: 590.40,
      },
    ],
  },
];

export const invoices: Invoice[] = [
  {
    id: "INV-2025-01",
    month: "January",
    year: 2025,
    status: "Generated",
    generatedDate: "2025-01-08",
  },
  {
    id: "INV-2024-12",
    month: "December",
    year: 2024,
    status: "Generated",
    generatedDate: "2025-01-01",
  },
  {
    id: "INV-2024-11",
    month: "November",
    year: 2024,
    status: "Generated",
    generatedDate: "2024-12-01",
  },
  {
    id: "INV-2024-10",
    month: "October",
    year: 2024,
    status: "Pending",
    generatedDate: null,
  },
];

