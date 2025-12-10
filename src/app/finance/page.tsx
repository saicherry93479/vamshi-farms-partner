"use client";

import { useState } from "react";
import { Download, ChevronRight, Calendar, Building2, X, FileText, CreditCard, Receipt } from "lucide-react";
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

// Helper function to format date as "08 - 14 Dec'25"
const formatPayoutCycle = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = end.toLocaleDateString("en-IN", { month: "short" });
  const year = end.getFullYear().toString().slice(-2);
  return `${startDay} - ${endDay} ${month}'${year}`;
};

// Helper function to format date as "10 Dec'25"
const formatPayoutDate = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  const year = d.getFullYear().toString().slice(-2);
  return `${day} ${month}'${year}`;
};

// Helper function to format date as "17 Dec'25, by 9PM"
const formatPayoutDateWithTime = (date: string) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  const year = d.getFullYear().toString().slice(-2);
  return `${day} ${month}'${year}, by 9PM`;
};

/* ------------------ Payout Section ------------------ */

function PayoutCycleCard({ payout }: { payout: Payout }) {
  return (
    <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payout Cycle</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatPayoutCycle(payout.periodStart, payout.periodEnd)}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payout Date</p>
              <p className="text-sm font-semibold text-gray-900">
                {formatPayoutDateWithTime(payout.payoutDate)}
              </p>
            </div>
            
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Orders</p>
              <p className="text-sm font-semibold text-gray-900">{payout.ordersCount}</p>
            </div>
          </div>
          
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Net Payout</p>
            <p className="text-2xl font-bold text-gray-900">{fMoney(payout.netPayout)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------ Invoice Section ------------------ */

function InvoiceDownloadCard({ 
  title, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  description: string; 
  icon: any;
}) {
  return (
    <Card className="rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Icon className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{description}</p>
          </div>
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------ MAIN PAGE ------------------ */

export default function FinancePage() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [payoutSheetOpen, setPayoutSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("payouts");

  // Get current payout (first one in the list)
  const currentPayout = seedPayouts[0];
  
  // Get past payouts (rest of the list)
  const pastPayouts = seedPayouts.slice(1);

  // Group invoices by year
  const invoicesByYear: Record<number, Invoice[]> = {};
  seedInvoices.forEach(invoice => {
    const year = invoice.year;
    if (!invoicesByYear[year]) {
      invoicesByYear[year] = [];
    }
    invoicesByYear[year].push(invoice);
  });

  const openPayoutSheet = (payout: Payout) => {
    setSelectedPayout(payout);
    setPayoutSheetOpen(true);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
          <p className="text-sm text-gray-500">
            Track settlements, invoices, and payout breakdowns.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="rounded-full bg-gray-100 p-1 w-fit">
            <TabsTrigger value="payouts" className="rounded-full px-4 py-2">
              Payouts
            </TabsTrigger>
            <TabsTrigger value="invoices" className="rounded-full px-4 py-2">
              Invoices & Taxes
            </TabsTrigger>
          </TabsList>

          {/* Payouts Tab */}
          <TabsContent value="payouts" className="space-y-6">
            {/* Current Payout Cycle */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Cycle</h2>
              <PayoutCycleCard payout={currentPayout} />
            </div>

            {/* Past Cycles */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Past Cycles</h2>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </div>

              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payout Cycle</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payout Date</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Orders</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payout</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">UTR</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pastPayouts.map((payout) => (
                      <TableRow key={payout.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">
                          {formatPayoutCycle(payout.periodStart, payout.periodEnd)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatPayoutDate(payout.payoutDate)}
                        </TableCell>
                        <TableCell>
                          <Badge className={`rounded-full px-2 py-0.5 ${
                            payout.status === "PAID"
                              ? "bg-emerald-50 text-emerald-700"
                              : payout.status === "TO BE PAID"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-50 text-gray-700"
                          }`}>
                            {payout.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">{payout.ordersCount}</TableCell>
                        <TableCell className="font-semibold text-gray-900">{fMoney(payout.netPayout)}</TableCell>
                        <TableCell className="text-gray-600 font-mono text-xs">
                          {payout.utr || "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8"
                              onClick={() => openPayoutSheet(payout)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8"
                              disabled={!payout.utr}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8"
                            >
                              <ChevronRight className="h-4 w-4" />
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

          {/* Invoices & Taxes Tab */}
          <TabsContent value="invoices" className="space-y-6">
            {/* Download Invoices Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Download Invoices</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <InvoiceDownloadCard
                  title="Online ordering"
                  description="Monthly commission invoices on an outlet level"
                  icon={CreditCard}
                />
                <InvoiceDownloadCard
                  title="Ads invoice"
                  description="Monthly Ads invoices on a Legal entity level"
                  icon={Receipt}
                />
                <InvoiceDownloadCard
                  title="Recovery"
                  description="Monthly recovery invoices on an outlet level"
                  icon={FileText}
                />
              </div>
            </div>

            {/* Financial Year Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Financial year: 2025</h2>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Select Year
                </Button>
              </div>

              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Month</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Invoice Number</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</TableHead>
                      <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wide">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoicesByYear[2025]?.map((invoice) => (
                      <TableRow key={invoice.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-900">
                          {invoice.month}, {invoice.year}
                        </TableCell>
                        <TableCell className="text-gray-600 font-mono text-sm">
                          {invoice.invoiceNumber || "226-11-00-129990"}
                        </TableCell>
                        <TableCell>
                          <Badge className={`rounded-full px-2 py-0.5 ${
                            invoice.status === "Generated"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-50 text-gray-700"
                          }`}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full"
                            disabled={invoice.status !== "Generated"}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* Download Tax Receipts Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Download Tax Receipts</h2>
              <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Receipt className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No tax receipts available for download yet.</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Tax receipts will be available after the financial year ends.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Payout Breakdown Sheet */}
        <Sheet open={payoutSheetOpen} onOpenChange={setPayoutSheetOpen}>
          <SheetContent side="right" className="max-w-lg w-full p-0 flex flex-col">
            {/* Sticky Top Header */}
            <div className="sticky top-0 z-20 bg-white border-b p-5 flex justify-between items-center">
              <div>
                <SheetTitle>Payout breakdown</SheetTitle>
                <SheetDescription>
                  {selectedPayout
                    ? `${fDate(selectedPayout.periodStart)} – ${fDate(
                        selectedPayout.periodEnd
                      )} • ${selectedPayout.ordersCount} orders`
                    : ""}
                </SheetDescription>
              </div>
              <Button variant="ghost" onClick={() => setPayoutSheetOpen(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </Button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 space-y-5">
              {/* Summary */}
              {selectedPayout && (
                <Card className="rounded-xl border bg-white shadow-sm">
                  <CardContent className="p-5 space-y-2">
                    <p className="text-sm text-gray-500">Net payout</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {fMoney(selectedPayout.netPayout)}
                    </p>
                    <Badge
                      className={`rounded-full ${
                        selectedPayout.status === "PAID"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {selectedPayout.status}
                    </Badge>
                  </CardContent>
                </Card>
              )}

              {/* Earnings */}
              {selectedPayout && (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Earnings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross order amount</span>
                        <span className="font-semibold text-gray-900">
                          {fMoney(selectedPayout.grossAmount ?? 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Adjustments & promos</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(selectedPayout.adjustments ?? 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Refunds</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(selectedPayout.refunds ?? 0)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Platform Charges */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Platform charges</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform fee</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(selectedPayout.platformFeeTotal ?? 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commission fee</span>
                        <span className="font-semibold text-red-600">
                          -{fMoney(selectedPayout.commissionFeeTotal ?? 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">GST</span>
                        <span className="font-semibold text-gray-900">
                          {fMoney(selectedPayout.gstAmount ?? 0)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Final Amount */}
                  <Card className="bg-emerald-50 border-emerald-100">
                    <CardContent className="p-5">
                      <p className="text-sm text-gray-600 mb-1">Amount transferred</p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {fMoney(selectedPayout.netPayout)}
                      </p>
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