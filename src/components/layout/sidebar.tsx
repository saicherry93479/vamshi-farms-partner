"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  HelpCircle,
  MessageSquare,
  ScrollText,
  ShoppingBasket,
  Wallet,
  Settings,
  LogOut,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/data/orders";

// Calculate preparing orders count dynamically
const getPreparingCount = () => {
  return orders.filter((order) => order.status === "preparing").length;
};

const NAV_ITEMS = [
  { label: "Orders", href: "/orders", icon: ScrollText, badge: getPreparingCount() },
  { label: "Menu & Inventory", href: "/menu", icon: ShoppingBasket },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Reviews", href: "/reviews", icon: MessageSquare },
  { label: "Finance", href: "/finance", icon: Wallet },
  { label: "Help Center", href: "/help", icon: HelpCircle },
];

const SECONDARY_ITEMS = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Logout", href: "/logout", icon: LogOut },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-gray-800 bg-[#1a1f2e]">
      {/* Brand/Logo Section */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <span className="font-bold text-lg">VF</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Vamshi Farms</p>
          <p className="text-xs text-gray-400">Partner Panel</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-1 px-3 py-6">
        {NAV_ITEMS.map((item) => {
          const isActive = 
            pathname === item.href || 
            (item.href !== "/" && pathname?.startsWith(`${item.href}/`));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#2d3548] text-blue-400"
                  : "text-gray-300 hover:bg-[#252b3d] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${isActive ? "text-blue-400" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge className={`rounded-full text-xs px-1.5 py-0.5 min-w-5 ${
                    isActive 
                      ? "bg-blue-500 text-white" 
                      : "bg-orange-500 text-white"
                  }`}>
                    {item.badge}
                  </Badge>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="px-3">
        <div className="border-t border-gray-800"></div>
      </div>

      {/* Secondary Navigation */}
      <div className="px-3 py-4">
        {SECONDARY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 hover:bg-[#252b3d] hover:text-white transition-all"
            >
              <Icon className="h-4 w-4 text-gray-400" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mt-auto p-4">
        <div className="rounded-xl bg-[#252b3d] p-4 border border-gray-800">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
              <HelpCircle className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Need help?</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Support team available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-400">VP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Vamsi Reddy</p>
            <p className="text-xs text-gray-400 truncate">Partner Lead</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
        </div>
      </div>
    </aside>
  );
}
