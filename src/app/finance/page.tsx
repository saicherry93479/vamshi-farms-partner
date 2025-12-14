"use client";

import { useState } from "react";
import {
  Download,
  ChevronRight,
  Calendar,
  X,
  FileText,
  CreditCard,
  Receipt,
  Search,
  Filter,
  ChevronDown,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Payout, Invoice } from "@/data/finance";
import { payouts as seedPayouts, invoices as seedInvoices } from "@/data/finance";

/* Utility helpers */
const fDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const fMoney = (n: number) =>
  `₹${n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

/* Helpers for formatting */
const formatPayoutCycle = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = end.toLocaleDateString("en-IN", { month: "short" });
  const year = end.getFullYear().toString().slice(-2);
  return `${startDay} - ${endDay} ${month}'${year}`;
};

const formatPayoutDateWithTime = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  const year = d.getFullYear().toString().slice(-2);
  return `${day} ${month}'${year}, by 9PM`;
};

/* ------------------ Main Page ------------------ */

export default function FinancePage() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [payoutSheetOpen, setPayoutSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("payouts");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentPayout = seedPayouts[0];
  const pastPayouts = seedPayouts.slice(1);

  // Filter payouts
  const filteredPayouts = pastPayouts.filter((payout) => {
    if (statusFilter !== "all" && payout.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!payout.id.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  // Group invoices by year
  const invoicesByYear: Record<number, Invoice[]> = {};
  seedInvoices.forEach((invoice) => {
    const year = invoice.year;
    if (!invoicesByYear[year]) invoicesByYear[year] = [];
    invoicesByYear[year].push(invoice);
  });

  const openPayoutSheet = (payout: Payout) => {
    setSelectedPayout(payout);
    setPayoutSheetOpen(true);
  };

  // Calculate totals
  const totalEarnings = seedPayouts.reduce((acc, p) => acc + p.grossAmount, 0);
  const totalPayout = seedPayouts.reduce((acc, p) => acc + p.netPayout, 0);
  const totalOrders = seedPayouts.reduce((acc, p) => acc + p.ordersCount, 0);

  return (
    <AppShell noPadding>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Finance</h1>
            <p className="text-sm text-gray-500">
              Track settlements, invoices, and payout breakdowns
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Total Earnings</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {fMoney(totalEarnings)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Total Payout</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {fMoney(totalPayout)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-blue-600">
                  <span>{totalOrders} orders processed</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Platform Fees</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {fMoney(seedPayouts.reduce((acc, p) => acc + p.platformFeeTotal, 0))}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                  <ArrowDownRight className="h-3 w-3" />
                  <span>-2.3% vs last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Pending Payout</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {fMoney(currentPayout?.netPayout || 0)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Receipt className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
                  <span>Expected by {currentPayout?.payoutDate ? fDate(currentPayout.payoutDate) : "TBD"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            {/* Tabs Header */}
            <div className="bg-white border-b border-gray-200 px-6">
              <TabsList className="h-12 bg-transparent gap-6 p-0">
                <TabsTrigger
                  value="payouts"
                  className="relative h-12 px-0 pb-0 pt-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-gray-500 data-[state=active]:text-blue-600 font-medium"
                >
                  Payouts
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="relative h-12 px-0 pb-0 pt-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 text-gray-500 data-[state=active]:text-blue-600 font-medium"
                >
                  Invoices & Taxes
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Payouts Content */}
            <TabsContent value="payouts" className="flex-1 overflow-y-auto m-0">
              <div className="p-6 space-y-6">
                {/* Current Cycle */}
                {currentPayout && (
                  <div>
                    <h2 className="text-sm font-semibold text-gray-700 mb-3">Current Cycle</h2>
                    <Card className="border border-blue-100 bg-blue-50/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-semibold text-gray-900">
                                {formatPayoutCycle(currentPayout.periodStart, currentPayout.periodEnd)}
                              </p>
                              <Badge className="bg-amber-100 text-amber-700 text-xs">
                                {currentPayout.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">
                              {currentPayout.ordersCount} orders • Expected: {currentPayout.payoutDate ? formatPayoutDateWithTime(currentPayout.payoutDate) : "TBD"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {fMoney(currentPayout.netPayout)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700 mt-1"
                              onClick={() => openPayoutSheet(currentPayout)}
                            >
                              View breakdown
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Filters */}
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-700">Payout History</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 w-48 text-sm"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32 h-9 text-sm">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="PAID">Paid</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-36 h-9 text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="this_month">This Month</SelectItem>
                        <SelectItem value="last_month">Last Month</SelectItem>
                        <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Payouts Table */}
                <Card className="border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Payout Cycle
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Payout Date
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Status
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Orders
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Gross Amount
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Net Payout
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          UTR
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-gray-600">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayouts.map((payout) => (
                        <TableRow key={payout.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-gray-900">
                            {formatPayoutCycle(payout.periodStart, payout.periodEnd)}
                          </TableCell>
                          <TableCell className="text-gray-600 text-sm">
                            {payout.payoutDate ? formatPayoutDateWithTime(payout.payoutDate) : "N/A"}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${
                                payout.status === "PAID"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {payout.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {payout.ordersCount}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {fMoney(payout.grossAmount)}
                          </TableCell>
                          <TableCell className="font-semibold text-gray-900">
                            {fMoney(payout.netPayout)}
                          </TableCell>
                          <TableCell className="text-gray-500 font-mono text-xs">
                            {payout.utr || "-"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={() => openPayoutSheet(payout)}
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                disabled={!payout.utr}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </TabsContent>

            {/* Invoices Content */}
            <TabsContent value="invoices" className="flex-1 overflow-y-auto m-0">
              <div className="p-6 space-y-6">
                {/* Download Cards */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">Download Invoices</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { title: "Online ordering", desc: "Monthly commission invoices", icon: CreditCard },
                      { title: "Ads invoice", desc: "Monthly Ads invoices", icon: Receipt },
                      { title: "Recovery", desc: "Monthly recovery invoices", icon: FileText },
                    ].map((item) => (
                      <Card key={item.title} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                              <item.icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Invoice Table */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-semibold text-gray-700">Financial year: 2025</h2>
                    <Select defaultValue="2025">
                      <SelectTrigger className="w-32 h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">FY 2025</SelectItem>
                        <SelectItem value="2024">FY 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Card className="border border-gray-200 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="text-xs font-semibold text-gray-600">Month</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600">Invoice Number</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600">Status</TableHead>
                          <TableHead className="text-xs font-semibold text-gray-600">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(invoicesByYear[2025] || []).map((invoice) => (
                          <TableRow key={invoice.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-gray-900">
                              {invoice.month}, {invoice.year}
                            </TableCell>
                            <TableCell className="text-gray-600 font-mono text-sm">
                              {invoice.invoiceNumber || "N/A"}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`text-xs ${
                                  invoice.status === "Generated"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {invoice.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 text-sm"
                                disabled={invoice.status !== "Generated"}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>

                {/* Tax Receipts */}
                <div>
                  <h2 className="text-sm font-semibold text-gray-700 mb-3">Tax Receipts</h2>
                  <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
                    <CardContent className="p-8 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                        <Receipt className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-600 font-medium">No tax receipts available</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Tax receipts will be available after the financial year ends
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Payout Breakdown Sheet */}
        <Sheet open={payoutSheetOpen} onOpenChange={setPayoutSheetOpen}>
          <SheetContent side="right" className="max-w-lg w-full p-0 flex flex-col">
            <div className="sticky top-0 z-20 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <SheetTitle className="text-lg">Payout Breakdown</SheetTitle>
                <SheetDescription className="text-sm">
                  {selectedPayout
                    ? `${fDate(selectedPayout.periodStart)} – ${fDate(selectedPayout.periodEnd)} • ${selectedPayout.ordersCount} orders`
                    : ""}
                </SheetDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setPayoutSheetOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {selectedPayout && (
                <>
                  {/* Net Payout Card */}
                  <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-5">
                      <p className="text-sm text-gray-600 mb-1">Net Payout</p>
                      <p className="text-3xl font-bold text-emerald-700">
                        {fMoney(selectedPayout.netPayout)}
                      </p>
                      <Badge
                        className={`mt-2 ${
                          selectedPayout.status === "PAID"
                            ? "bg-emerald-200 text-emerald-800"
                            : "bg-amber-200 text-amber-800"
                        }`}
                      >
                        {selectedPayout.status}
                      </Badge>
                    </CardContent>
                  </Card>

                  {/* Earnings */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">Earnings</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Gross order amount</span>
                        <span className="font-semibold text-gray-900">
                          {fMoney(selectedPayout.grossAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Adjustments & promos</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(Math.abs(selectedPayout.adjustments))}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Refunds</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(Math.abs(selectedPayout.refunds))}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Platform Charges */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">Platform Charges</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Platform fee</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(selectedPayout.platformFeeTotal)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Commission fee</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(selectedPayout.commissionFeeTotal)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">GST (CGST + SGST)</span>
                        <span className="font-semibold text-gray-900">
                          {fMoney(selectedPayout.gstAmount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Final Amount */}
                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Amount Transferred</span>
                        <span className="text-xl font-bold text-blue-700">
                          {fMoney(selectedPayout.netPayout)}
                        </span>
                      </div>
                      {selectedPayout.utr && (
                        <p className="text-xs text-gray-500 mt-2">
                          UTR: {selectedPayout.utr}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AppShell>
  );
}
