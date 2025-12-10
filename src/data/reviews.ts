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

export const reviews: Review[] = [
  {
    id: "rev-101",
    customer: "Tanvi D.",
    rating: 5,
    title: "Consistent freshness",
    comment:
      "Every box feels hand-picked. The greens stay crisp for days and the honey is incredible.",
    date: "2025-01-04",
    channel: "App",
    status: "RESOLVED",
    issueTypes: [],
    orderId: "ORD-1024",
    replies: [
      {
        id: "reply-1",
        text: "Thank you for your kind words! We're thrilled that you're enjoying the freshness. We'll continue to maintain our quality standards.",
        timestamp: "2025-01-04T14:30:00",
        author: "Partner Team",
      },
    ],
    notes: [],
  },
  {
    id: "rev-102",
    customer: "Rahul M.",
    rating: 4,
    title: "Fast pickup",
    comment:
      "Pickup window is smooth. Would love earlier slots on Saturdays for bulk prep.",
    date: "2025-01-02",
    channel: "WhatsApp",
    status: "RESPONDED",
    issueTypes: [],
    orderId: "ORD-1025",
    replies: [
      {
        id: "reply-2",
        text: "Thanks for the feedback! We're exploring earlier Saturday slots. Will update you soon.",
        timestamp: "2025-01-02T16:20:00",
        author: "Partner Team",
      },
    ],
    notes: [
      {
        id: "note-1",
        text: "Customer is a regular bulk buyer. Consider priority scheduling.",
        timestamp: "2025-01-02T16:25:00",
        author: "Manager",
      },
    ],
  },
  {
    id: "rev-103",
    customer: "Priya K.",
    rating: 5,
    title: "Kids love the milk",
    comment:
      "A2 milk has been a game changer. Please keep stock notifications coming.",
    date: "2024-12-29",
    channel: "App",
    status: "RESOLVED",
    issueTypes: [],
    orderId: "ORD-1026",
    replies: [
      {
        id: "reply-3",
        text: "We're so happy to hear that! Stock notifications are now enabled for your account.",
        timestamp: "2024-12-29T18:15:00",
        author: "Partner Team",
      },
    ],
    notes: [],
  },
  {
    id: "rev-104",
    customer: "Sumeet B.",
    rating: 3,
    title: "Inventory visibility",
    comment:
      "Occasionally items show available but get swapped at pickup. Need clearer slots.",
    date: "2024-12-27",
    channel: "In-person",
    status: "NEW",
    issueTypes: ["Missing items", "Delay"],
    orderId: "ORD-1027",
    replies: [],
    notes: [
      {
        id: "note-2",
        text: "Issue reported multiple times. Review inventory sync process.",
        timestamp: "2024-12-27T10:00:00",
        author: "Support Lead",
      },
    ],
  },
  {
    id: "rev-105",
    customer: "Anjali S.",
    rating: 2,
    title: "Late delivery",
    comment:
      "Order was delayed by 2 hours. Had to wait at the pickup point.",
    date: "2025-01-05",
    channel: "App",
    status: "NEW",
    issueTypes: ["Delay"],
    orderId: "ORD-1028",
    replies: [],
    notes: [],
  },
  {
    id: "rev-106",
    customer: "Vikram R.",
    rating: 4,
    title: "Great quality",
    comment:
      "Products are fresh and well-packaged. Very satisfied with the service.",
    date: "2025-01-03",
    channel: "Website",
    status: "RESPONDED",
    issueTypes: [],
    orderId: "ORD-1029",
    replies: [
      {
        id: "reply-4",
        text: "Thank you for your feedback! We appreciate your support.",
        timestamp: "2025-01-03T12:00:00",
        author: "Partner Team",
      },
    ],
    notes: [],
  },
];

