export type ReviewStatus = "NEW" | "RESPONDED" | "RESOLVED";
export type IssueType = "Delay" | "Packaging" | "Missing items" | "Taste" | "Other";
export type ReviewChannel = "App" | "WhatsApp" | "Website" | "In-person";

export type Reply = {
  id: string;
  text: string;
  timestamp: string;
  author: string;
};

export type InternalNote = {
  id: string;
  text: string;
  timestamp: string;
  author: string;
};

export type Review = {
  id: string;
  customer: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  channel: ReviewChannel;
  status: ReviewStatus;
  issueTypes: IssueType[];
  orderId?: string;
  replies: Reply[];
  notes: InternalNote[];
};

// Get dates relative to today for realistic "X days ago" display
const today = new Date();
const getDateDaysAgo = (days: number): string => {
  const date = new Date(today);
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

export const reviews: Review[] = [
  {
    id: "rev-101",
    customer: "Vineeta Jaiswal",
    rating: 1,
    title: "Poor quality",
    comment:
      "Incomplete order, too cold. Not good quality. Didn't expect this from Zomato.",
    date: getDateDaysAgo(1),
    channel: "App",
    status: "NEW",
    issueTypes: ["Missing items", "Taste"],
    orderId: "7530992338",
    replies: [],
    notes: [],
  },
  {
    id: "rev-102",
    customer: "Surya",
    rating: 1,
    title: "Delayed order",
    comment: "Order always gets delayed",
    date: getDateDaysAgo(7),
    channel: "App",
    status: "NEW",
    issueTypes: ["Delay"],
    orderId: "7530992339",
    replies: [],
    notes: [],
  },
  {
    id: "rev-103",
    customer: "Vijaya",
    rating: 1,
    title: "Missing items in 1+1 offer",
    comment:
      "i didn't get 1 +1 offer i ordered 4 idly and 4 bonda then i should get 8idlies and 8 bonda i didn't get",
    date: getDateDaysAgo(8),
    channel: "App",
    status: "NEW",
    issueTypes: ["Missing items", "Other"],
    orderId: "7530992340",
    replies: [],
    notes: [],
  },
  {
    id: "rev-104",
    customer: "Rahul M.",
    rating: 4,
    title: "Fast pickup",
    comment:
      "Pickup window is smooth. Would love earlier slots on Saturdays for bulk prep.",
    date: getDateDaysAgo(12),
    channel: "WhatsApp",
    status: "RESPONDED",
    issueTypes: [],
    orderId: "7530992341",
    replies: [
      {
        id: "reply-2",
        text: "Thanks for the feedback! We're exploring earlier Saturday slots. Will update you soon.",
        timestamp: getDateDaysAgo(11),
        author: "Partner Team",
      },
    ],
    notes: [],
  },
  {
    id: "rev-105",
    customer: "Priya K.",
    rating: 5,
    title: "Great food",
    comment:
      "The food quality is excellent. Loved the idli and dosa. Will order again!",
    date: getDateDaysAgo(14),
    channel: "App",
    status: "RESOLVED",
    issueTypes: [],
    orderId: "7530992342",
    replies: [
      {
        id: "reply-3",
        text: "Thank you so much for your kind words! We're glad you enjoyed the food.",
        timestamp: getDateDaysAgo(13),
        author: "Partner Team",
      },
    ],
    notes: [],
  },
  {
    id: "rev-106",
    customer: "Anjali S.",
    rating: 2,
    title: "Cold food",
    comment:
      "Food arrived cold. Packaging was not proper. Expected better from this restaurant.",
    date: getDateDaysAgo(3),
    channel: "App",
    status: "NEW",
    issueTypes: ["Packaging", "Taste"],
    orderId: "7530992343",
    replies: [],
    notes: [],
  },
  {
    id: "rev-107",
    customer: "Kiran",
    rating: 3,
    title: "Average experience",
    comment:
      "Food was okay but portion size was less for the price. Delivery was on time though.",
    date: getDateDaysAgo(5),
    channel: "Website",
    status: "RESPONDED",
    issueTypes: [],
    orderId: "7530992344",
    replies: [
      {
        id: "reply-4",
        text: "We appreciate your feedback. We'll work on improving our portion sizes.",
        timestamp: getDateDaysAgo(4),
        author: "Partner Team",
      },
    ],
    notes: [],
  },
];
