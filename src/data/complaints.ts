export type ComplaintStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type ComplaintType = "Delay" | "Packaging" | "Missing items" | "Quality" | "Payment" | "Other";
export type ComplaintPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Complaint {
    id: string;
    orderId: string;
    customer: string;
    type: ComplaintType;
    priority: ComplaintPriority;
    status: ComplaintStatus;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    orderTotal: number;
    assignedTo?: string;
    resolution?: string;
}

export const complaints: Complaint[] = [
    {
        id: "CMP-001",
        orderId: "ORD-2024-1234",
        customer: "Rajesh Kumar",
        type: "Delay",
        priority: "HIGH",
        status: "OPEN",
        title: "Order delivered 2 hours late",
        description: "Customer expected delivery by 12 PM but received at 2:15 PM. Very upset about the delay.",
        createdAt: "2025-12-13T14:30:00",
        updatedAt: "2025-12-13T14:30:00",
        orderTotal: 1250,
    },
    {
        id: "CMP-002",
        orderId: "ORD-2024-1189",
        customer: "Priya Sharma",
        type: "Missing items",
        priority: "URGENT",
        status: "IN_PROGRESS",
        title: "2 items missing from order",
        description: "Customer did not receive: 1kg Tomatoes and 500g Onions. Requesting immediate resolution or refund.",
        createdAt: "2025-12-13T11:00:00",
        updatedAt: "2025-12-13T15:20:00",
        orderTotal: 890,
        assignedTo: "Support Team",
    },
    {
        id: "CMP-003",
        orderId: "ORD-2024-1156",
        customer: "Arun Patel",
        type: "Quality",
        priority: "MEDIUM",
        status: "OPEN",
        title: "Vegetables not fresh",
        description: "Customer reports that the spinach and coriander were wilted upon delivery.",
        createdAt: "2025-12-12T18:45:00",
        updatedAt: "2025-12-12T18:45:00",
        orderTotal: 650,
    },
    {
        id: "CMP-004",
        orderId: "ORD-2024-1098",
        customer: "Meena Reddy",
        type: "Packaging",
        priority: "LOW",
        status: "RESOLVED",
        title: "Damaged packaging",
        description: "The egg carton was partially crushed. 2 eggs were broken.",
        createdAt: "2025-12-11T10:00:00",
        updatedAt: "2025-12-12T14:00:00",
        orderTotal: 480,
        resolution: "Refunded ₹80 for damaged eggs. Customer satisfied.",
    },
    {
        id: "CMP-005",
        orderId: "ORD-2024-1045",
        customer: "Suresh Nair",
        type: "Payment",
        priority: "HIGH",
        status: "OPEN",
        title: "Double charged for order",
        description: "Customer claims they were charged twice for the same order. Bank statement shows duplicate transactions.",
        createdAt: "2025-12-13T09:15:00",
        updatedAt: "2025-12-13T09:15:00",
        orderTotal: 1580,
    },
    {
        id: "CMP-006",
        orderId: "ORD-2024-0987",
        customer: "Lakshmi Iyer",
        type: "Other",
        priority: "LOW",
        status: "CLOSED",
        title: "Delivery person was rude",
        description: "Customer complained about the delivery person's behavior during handover.",
        createdAt: "2025-12-10T16:30:00",
        updatedAt: "2025-12-11T10:00:00",
        orderTotal: 720,
        assignedTo: "Operations",
        resolution: "Spoke with delivery partner. Warned about professional behavior.",
    },
];
