"use client";

import { useMemo, useState, useEffect } from "react";
import {
  CheckCircle,
  Clock,
  Package,
  Truck,
  Search,
  Phone,
  Timer,
  Utensils,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { Order, OrderStatus } from "@/data/orders";
import { orders as seedOrders } from "@/data/orders";

type OrderState = Record<OrderStatus, Order[]>;

const STATUS_TABS: { value: OrderStatus; label: string; icon: React.ElementType }[] = [
  { value: "preparing", label: "Preparing", icon: Clock },
  { value: "ready", label: "Ready", icon: Package },
  { value: "picked_up", label: "Picked Up", icon: CheckCircle },
  { value: "delivered", label: "Delivered", icon: Truck },
];

// Order Card Component - Zomato style
function OrderCard({
  order,
  onMarkReady,
  onMarkPickedUp,
}: {
  order: Order;
  onMarkReady?: () => void;
  onMarkPickedUp?: () => void;
}) {
  const [timeElapsed, setTimeElapsed] = useState("0:00");

  // Timer for order ready button
  useEffect(() => {
    if (order.status !== "preparing") return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setTimeElapsed(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [order.status]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Left accent bar for preparing orders */}
      <div className="flex">
        {order.status === "preparing" && (
          <div className="w-1 bg-purple-400 flex-shrink-0" />
        )}

        <div className="flex-1 p-4">
          {/* Header: Customer info and actions */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">
                  {order.customer.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                <p className="text-xs text-gray-500">
                  {order.eta} • {order.orderTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Phone className="h-4 w-4 text-green-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Timer className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Send cutlery option */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
            <Utensils className="h-4 w-4 text-green-600" />
            <span>Send cutlery</span>
          </div>

          {/* Order Items */}
          <div className="space-y-2 mb-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 border border-green-600 rounded flex items-center justify-center">
                    <span className="w-2 h-2 bg-green-600 rounded-sm"></span>
                  </span>
                  <span className="text-sm text-gray-800">
                    {order.itemQuantities?.[index] || 1} x {item}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₹{Math.round(order.total / order.items.length)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Bill */}
          <div className="flex items-center justify-between py-2 border-t border-dashed border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-900">Total Bill</span>
              <Badge className="bg-green-100 text-green-700 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                PAID
              </Badge>
            </div>
            <span className="text-sm font-semibold text-gray-900">₹{order.total}</span>
          </div>

          {/* Action Buttons */}
          {order.status === "preparing" && onMarkReady && (
            <Button
              onClick={onMarkReady}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 text-sm font-medium"
            >
              Order ready ({timeElapsed})
            </Button>
          )}

          {order.status === "ready" && onMarkPickedUp && (
            <Button
              onClick={onMarkPickedUp}
              className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white rounded-lg h-10 text-sm font-medium"
            >
              Picked Up
            </Button>
          )}

          {/* Complaint if any */}
          {order.complaint && (
            <p className="text-xs text-red-500 mt-2 font-medium">
              ⚠ {order.complaint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orderState, setOrderState] = useState<OrderState>(() => ({
    preparing: seedOrders.filter((order) => order.status === "preparing"),
    ready: seedOrders.filter((order) => order.status === "ready"),
    picked_up: seedOrders.filter((order) => order.status === "picked_up"),
    delivered: seedOrders.filter((order) => order.status === "delivered"),
  }));
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<OrderStatus>("preparing");

  const moveOrder = (id: string, from: OrderStatus, to: OrderStatus) => {
    setOrderState((prev) => {
      const order = prev[from].find((item) => item.id === id);
      if (!order) return prev;

      const updatedOrder = { ...order, status: to };

      return {
        ...prev,
        [from]: prev[from].filter((item) => item.id !== id),
        [to]: [updatedOrder, ...prev[to]],
      };
    });
  };

  // Auto-move from picked_up to delivered after 5 seconds (simulating delivery)
  useEffect(() => {
    const pickedUpOrders = orderState.picked_up;
    if (pickedUpOrders.length === 0) return;

    const timeouts = pickedUpOrders.map((order) => {
      return setTimeout(() => {
        moveOrder(order.id, "picked_up", "delivered");
      }, 5000);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [orderState.picked_up]);

  // Filter orders based on search
  const getFilteredOrders = (status: OrderStatus) => {
    if (!searchQuery) return orderState[status];
    const query = searchQuery.toLowerCase();
    return orderState[status].filter(
      (order) =>
        order.customer.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query) ||
        order.items.some((item) => item.toLowerCase().includes(query))
    );
  };

  return (
    <AppShell noPadding>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <h1 className="text-lg font-semibold text-gray-900">Orders</h1>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-50 text-emerald-700 rounded-full px-3 py-1">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Live
            </Badge>
            <span className="text-xs text-gray-400">Remaining time</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden bg-gray-50">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as OrderStatus)}
            className="h-full flex flex-col"
          >
            {/* Tabs Header */}
            <div className="bg-white border-b border-gray-200 px-6">
              <TabsList className="h-12 bg-transparent gap-6 p-0">
                {STATUS_TABS.map((tab) => {
                  const count = orderState[tab.value].length;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="relative h-12 px-0 pb-0 pt-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-gray-500 data-[state=active]:text-blue-600 font-medium"
                    >
                      {tab.label}
                      {count > 0 && (
                        <Badge
                          className={`ml-2 rounded-full text-xs px-1.5 py-0.5 min-w-5 ${
                            activeTab === tab.value
                              ? "bg-blue-600 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {count}
                        </Badge>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Search Bar */}
            <div className="bg-white border-b border-gray-200 px-6 py-3">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer, order ID, or item..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 border-gray-200 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {STATUS_TABS.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredOrders(tab.value).length === 0 ? (
                      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <tab.icon className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">
                          No orders in {tab.label.toLowerCase()}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          Orders will appear here automatically
                        </p>
                      </div>
                    ) : (
                      getFilteredOrders(tab.value).map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          onMarkReady={
                            tab.value === "preparing"
                              ? () => moveOrder(order.id, "preparing", "ready")
                              : undefined
                          }
                          onMarkPickedUp={
                            tab.value === "ready"
                              ? () => moveOrder(order.id, "ready", "picked_up")
                              : undefined
                          }
                        />
                      ))
                    )}
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </AppShell>
  );
}
