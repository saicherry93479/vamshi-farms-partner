export type PayoutStatus = "PAID" | "PENDING" | "TO BE PAID";

export type OrderBreakdown = {
  orderId: string;
  customer: string;
  amount: number;
  platformFee: number;
  commissionFee: number;
  netAmount: number;
};

export type Payout = {
  id: string;
  netPayout: number;
  status: PayoutStatus;
  ordersCount: number;
  periodStart: string;
  periodEnd: string;

  // 🔥 Added missing fields used by your UI
  payoutDate?: string; // used in: formatPayoutDateWithTime(payout.payoutDate)
  utr?: string; // used in: payout.utr || "-"

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

  // Optional invoice number (fallback added in UI)
  invoiceNumber?: string;
};

/* -------------------------------------------------- */
/*               PAYOUTS DATA                         */
/* -------------------------------------------------- */

export const payouts: Payout[] = [
  // ---------------- CURRENT CYCLE ----------------
  {
    id: "P-98234",
    netPayout: 84200.5,
    status: "PENDING",
    ordersCount: 142,
    periodStart: "2025-01-01",
    periodEnd: "2025-01-07",

    payoutDate: "2025-01-10",
    

    creditedDate: null,
    platformFeeTotal: 2840.0,
    commissionFeeTotal: 12630.0,
    gstAmount: 2774.0,
    cgstAmount: 1387.0,
    sgstAmount: 1387.0,
    adjustments: -500.0,
    refunds: -1200.0,
    grossAmount: 100000.5,

    orders: [
      {
        orderId: "ORD-1024",
        customer: "Aarav R.",
        amount: 820.0,
        platformFee: 24.6,
        commissionFee: 123.0,
        netAmount: 672.4,
      },
      {
        orderId: "ORD-1025",
        customer: "Meera S.",
        amount: 640.0,
        platformFee: 19.2,
        commissionFee: 96.0,
        netAmount: 524.8,
      }
    ],
  },

  // ---------------- PAST CYCLE 1 ----------------
  {
    id: "P-98212",
    netPayout: 76480.25,
    status: "PAID",
    ordersCount: 128,
    periodStart: "2024-12-25",
    periodEnd: "2024-12-31",

    payoutDate: "2025-01-06",
    utr: "UTR20250106XYZ123",

    creditedDate: "2025-01-06",
    platformFeeTotal: 2560.0,
    commissionFeeTotal: 11520.0,
    gstAmount: 2536.0,
    cgstAmount: 1268.0,
    sgstAmount: 1268.0,
    adjustments: 0.0,
    refunds: -800.0,
    grossAmount: 92000.25,

    orders: [
      {
        orderId: "ORD-1015",
        customer: "Tanvi D.",
        amount: 750.0,
        platformFee: 22.5,
        commissionFee: 112.5,
        netAmount: 615.0,
      },
      {
        orderId: "ORD-1016",
        customer: "Rahul M.",
        amount: 680.0,
        platformFee: 20.4,
        commissionFee: 102.0,
        netAmount: 557.6,
      }
    ],
  },

  // ---------------- PAST CYCLE 2 ----------------
  {
    id: "P-98199",
    netPayout: 68220.75,
    status: "PAID",
    ordersCount: 115,
    periodStart: "2024-12-18",
    periodEnd: "2024-12-24",

    payoutDate: "2025-01-02",
    utr: "UTR20250102ABC998",

    creditedDate: "2025-01-02",
    platformFeeTotal: 2300.0,
    commissionFeeTotal: 10233.0,
    gstAmount: 2256.0,
    cgstAmount: 1128.0,
    sgstAmount: 1128.0,
    adjustments: -200.0,
    refunds: -600.0,
    grossAmount: 82000.75,

    orders: [
      {
        orderId: "ORD-1008",
        customer: "Sumeet B.",
        amount: 550.0,
        platformFee: 16.5,
        commissionFee: 82.5,
        netAmount: 451.0,
      }
    ],
  },
];

/* -------------------------------------------------- */
/*               INVOICES DATA                        */
/* -------------------------------------------------- */

export const invoices: Invoice[] = [
  {
    id: "INV-2025-01",
    month: "January",
    year: 2025,
    status: "Generated",
    generatedDate: "2025-01-08",
    invoiceNumber: "226-11-00-128888",
  },
  {
    id: "INV-2024-12",
    month: "December",
    year: 2024,
    status: "Generated",
    generatedDate: "2025-01-01",
    invoiceNumber: "226-11-00-127777",
  },
  {
    id: "INV-2024-11",
    month: "November",
    year: 2024,
    status: "Generated",
    generatedDate: "2024-12-01",
    invoiceNumber: "226-11-00-126666",
  },
  {
    id: "INV-2024-10",
    month: "October",
    year: 2024,
    status: "Pending",
    generatedDate: null,
    invoiceNumber: "226-11-00-125555",
  },
];
