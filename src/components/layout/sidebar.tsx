"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  HelpCircle,
  LayoutPanelLeft,
  MessageSquare,
  ScrollText,
  ShoppingBasket,
  Wallet,
  Home,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NAV_ITEMS = [
  { label: "Orders", href: "/orders", icon: ScrollText, badge: 3 },
  { label: "Menu & Inventory", href: "/menu", icon: ShoppingBasket },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Reviews", href: "/reviews", icon: MessageSquare, badge: 12 },
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
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col border-r border-gray-100 bg-white">
      {/* Brand/Logo Section */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <span className="font-bold text-lg">VF</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Vamshi Farms</p>
          <p className="text-xs text-gray-500">Partner Panel</p>
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
              className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span>{item.label}</span>
              </div>
              
              <div className="flex items-center gap-2">
                {item.badge && (
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 min-w-5">
                    {item.badge}
                  </Badge>
                )}
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-emerald-500" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="px-3">
        <div className="border-t border-gray-100"></div>
      </div>

      {/* Secondary Navigation */}
      <div className="px-3 py-4">
        {SECONDARY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                <Icon className="h-4 w-4" />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mt-auto p-4">
        <div className="rounded-2xl bg-emerald-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-900">Need help?</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Our support team responds in under 5 mins
              </p>
              <button className="mt-2 text-xs font-medium text-emerald-700 hover:text-emerald-800">
                Chat now →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-emerald-700">VP</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Vamsi Reddy</p>
            <p className="text-xs text-gray-500 truncate">Partner Lead</p>
          </div>
          <Badge className="rounded-full bg-emerald-100 text-emerald-700 text-xs">
            Online
          </Badge>
        </div>
      </div>
    </aside>
  );
}