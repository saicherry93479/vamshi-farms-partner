"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Bell, HelpCircle, Search, Menu, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const routeTitleMap: Record<string, string> = {
  "/orders": "Orders",
  "/menu": "Menu & Inventory",
  "/reports": "Reports",
  "/reviews": "Reviews",
  "/finance": "Finance",
  "/help": "Help Center",
};

export function Topbar() {
  const pathname = usePathname();

  const title = useMemo(() => {
    if (!pathname) return "Dashboard";
    const matched = Object.entries(routeTitleMap).find(([route]) =>
      pathname.startsWith(route)
    );
    return matched?.[1] ?? "Dashboard";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-100">
      <div className="flex h-16 items-center justify-between px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button (hidden on desktop) */}
          <button className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl hover:bg-gray-50">
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          
          {/* Page Title Only - No Logo */}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            {pathname === "/reviews" && (
              <p className="text-xs text-gray-500 mt-0.5">Respond in under 5 mins</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Search orders, menu, payouts..."
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            {/* Notification */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl"
            >
              <HelpCircle className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Settings */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </Button>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            {/* Profile Avatar */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              
              {/* Profile Info - Hidden on mobile, visible on medium screens */}
              <div className="hidden md:block">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-semibold text-gray-900">Vamsi Reddy</p>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Partner Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}