import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const quickLinks = [
  { title: "Orders", href: "/orders", description: "Live queue and handovers" },
  {
    title: "Menu & Inventory",
    href: "/menu",
    description: "Toggle stock and edit SKUs",
  },
  { title: "Reports", href: "/reports", description: "Performance snapshots" },
  { title: "Reviews", href: "/reviews", description: "Partner feedback" },
];

export default function Home() {
  return (
    <AppShell>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="md:col-span-2 xl:col-span-3 border shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">
              Welcome to Vamshi Farms Partner Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600">
            Manage pickup readiness, keep menus aligned with stock, and stay ahead
            of partner feedback with this minimal dashboard.
          </CardContent>
        </Card>
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="block">
            <Card className="h-full border shadow-sm transition hover:shadow-md">
              <CardContent className="p-5">
                <p className="text-sm uppercase tracking-wide text-gray-400">
                  {link.title}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {link.description}
                </h3>
              </CardContent>
            </Card>
          </Link>
        ))}
        </div>
    </AppShell>
  );
}
