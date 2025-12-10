"use client";

import { useMemo, useState } from "react";
import { CheckCircle, Clock, Package, TrendingUp, MoreVertical } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Order, OrderStatus } from "@/data/orders";
import { orders as seedOrders } from "@/data/orders";

type OrderState = Record<OrderStatus, Order[]>;

const STATUS_TABS: { value: OrderStatus; label: string; icon: any }[] = [
  { value: "preparing", label: "Preparing", icon: Clock },
  { value: "ready", label: "Ready", icon: Package },
  { value: "picked_up", label: "Picked Up", icon: CheckCircle },
];

export default function OrdersPage() {
  const [orderState, setOrderState] = useState<OrderState>(() => ({
    preparing: seedOrders.filter((order) => order.status === "preparing"),
    ready: seedOrders.filter((order) => order.status === "ready"),
    picked_up: seedOrders.filter((order) => order.status === "picked_up"),
  }));

  const totalOrders = useMemo(
    () =>
      orderState.preparing.length +
      orderState.ready.length +
      orderState.picked_up.length,
    [orderState]
  );

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

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "preparing":
        return "bg-amber-50 text-amber-700";
      case "ready":
        return "bg-blue-50 text-blue-700";
      case "picked_up":
        return "bg-emerald-50 text-emerald-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500">
              Manage and track your orders in real-time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-50 text-emerald-700 rounded-full">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Live
            </Badge>
            <span className="text-xs text-gray-500">Updates every 15s</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Open Orders</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">{orderState.preparing.length}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                      <TrendingUp className="h-3 w-3" />
                      +6 today
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Ready for Pickup</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">{orderState.ready.length}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                      <TrendingUp className="h-3 w-3" />
                      +2 in last 30m
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Orders Today</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      Peak at 12:30 PM
                    </span>
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Orders Card */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-gray-900">Live Orders</CardTitle>
                <CardDescription className="text-gray-500">
                  Real-time prep → ready → pickup stream
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                View All Orders
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preparing" className="w-full">
              <TabsList className="rounded-full bg-gray-100 p-1 w-fit">
                {STATUS_TABS.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-full px-4 py-2"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <span>{tab.label}</span>
                      <Badge className="ml-2 rounded-full bg-gray-200 text-gray-700">
                        {orderState[tab.value].length}
                      </Badge>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {STATUS_TABS.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsContent key={tab.value} value={tab.value} className="mt-6">
                    <div className="space-y-3">
                      {orderState[tab.value].length === 0 ? (
                        <Card className="border-dashed border-gray-200 bg-gray-50">
                          <CardContent className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                              <Icon className="h-6 w-6 text-gray-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">
                                No orders in {tab.label.toLowerCase()}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                Incoming orders will appear here automatically
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        orderState[tab.value].map((order) => (
                          <Card
                            key={order.id}
                            className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                  <Avatar className="h-10 w-10 flex-shrink-0">
                                    <AvatarFallback className="text-sm font-semibold">
                                      {order.customer.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                      <p className="text-sm font-semibold text-gray-900 truncate">
                                        {order.customer}
                                      </p>
                                      <Badge className={`rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status.replace("_", " ").toUpperCase()}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2">
                                      {order.id} • ETA: {order.eta}
                                    </p>
                                    <div className="space-y-1">
                                      {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                          <p className="text-sm text-gray-700 truncate">{item}</p>
                                          <p className="text-sm font-medium text-gray-900 ml-2 flex-shrink-0">
                                            {order.itemQuantities?.[index] || 1}x
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex flex-col items-end gap-3 ml-4 flex-shrink-0">
                                  <div className="flex items-center gap-2">
                                    <Badge className="rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold">
                                      ₹{order.total}
                                    </Badge>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" className="w-48">
                                        <DropdownMenuItem>View Details</DropdownMenuItem>
                                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                                        <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                                        {tab.value !== "picked_up" && (
                                          <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                                        )}
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  
                                  {tab.value === "preparing" && (
                                    <Button
                                      size="sm"
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4"
                                      onClick={() => moveOrder(order.id, "preparing", "ready")}
                                    >
                                      Mark as Ready
                                    </Button>
                                  )}
                                  {tab.value === "ready" && (
                                    <Button
                                      size="sm"
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4"
                                      onClick={() => moveOrder(order.id, "ready", "picked_up")}
                                    >
                                      Mark as Picked Up
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}