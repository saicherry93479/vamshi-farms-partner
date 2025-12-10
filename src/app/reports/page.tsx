"use client";

import { useState } from "react";
import { Download, Calendar, TrendingUp, TrendingDown, ChevronDown } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { ReportsData, SparkPoint } from "@/data/reports";
import { weeklyReport, monthlyReport } from "@/data/reports";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

type ReportTabProps = {
  data: ReportsData;
};

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("this_week");

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-sm text-gray-500">
              Track performance of orders, revenue and pickup funnel
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this_week">This week</SelectItem>
                <SelectItem value="last_week">Last week</SelectItem>
                <SelectItem value="this_month">This month</SelectItem>
                <SelectItem value="last_month">Last month</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="rounded-full">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900">Performance Overview</CardTitle>
                <CardDescription className="text-gray-500">
                  Key metrics for the selected period
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-50 text-emerald-700 rounded-full">Live</Badge>
                <span className="text-xs text-gray-500">Updates every 5 mins</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="weekly" className="w-full">
              <TabsList className="rounded-full bg-gray-100 p-1 w-fit">
                <TabsTrigger value="weekly" className="rounded-full px-4 py-2">
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="rounded-full px-4 py-2">
                  Monthly
                </TabsTrigger>
              </TabsList>

              <TabsContent value="weekly" className="pt-5">
                <ReportTab data={weeklyReport} />
              </TabsContent>
              <TabsContent value="monthly" className="pt-5">
                <ReportTab data={monthlyReport} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function ReportTab({ data }: ReportTabProps) {
  const colors = ["#16a34a", "#2563eb", "#7c3aed", "#dc2626"];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((metric, index) => (
          <Card 
            key={metric.label}
            className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{metric.label}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      metric.trend === "up"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {metric.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    vs previous period
                  </p>
                </div>
                <div className="h-10 w-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.sparks[metric.label] || []}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={colors[index % colors.length]}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Orders & Revenue Trend */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="text-gray-900">Orders & Revenue Trend</CardTitle>
            <CardDescription className="text-gray-500">
              Daily performance overview
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 1.5, stroke: "#16a34a", fill: "white" }}
                  activeDot={{ r: 5 }}
                  name="Orders"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3, strokeWidth: 1.5, stroke: "#2563eb", fill: "white" }}
                  activeDot={{ r: 5 }}
                  name="Revenue (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Basket Mix */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="text-gray-900">Basket Mix</CardTitle>
            <CardDescription className="text-gray-500">
              Order distribution by day
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chart} barCategoryGap={12}>
                <CartesianGrid vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    borderColor: "#e5e7eb",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                  }}
                />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  radius={[8, 8, 0, 0]}
                >
                  {data.chart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Funnel & Conversion */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Funnel */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="text-gray-900">Conversion Funnel</CardTitle>
            <CardDescription className="text-gray-500">
              From views to picked-up orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.funnel.map((step, index) => {
                const conversionPercent = typeof step.conversion === 'string' 
                  ? parseInt(step.conversion) 
                  : step.conversion || 0;
                
                return (
                  <div key={step.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-700">{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{step.label}</p>
                          <p className="text-xs text-gray-500">{conversionPercent}% conversion</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          {step.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div 
                        className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                        style={{ 
                          width: `${Math.max(5, Math.min(100, conversionPercent - index * 5))}%` 
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <CardTitle className="text-gray-900">Performance Summary</CardTitle>
            <CardDescription className="text-gray-500">
              Key insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-xl bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800">Peak Performance</p>
                    <p className="text-sm text-emerald-700">
                      Wednesday shows the highest order conversion rate at 85%
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">Opportunity</p>
                    <p className="text-sm text-amber-700">
                      Sunday has the lowest pickup rate. Consider time-specific promotions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-xl bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">Weekly Trend</p>
                    <p className="text-sm text-blue-700">
                      Orders peak mid-week. Consider adjusting inventory accordingly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}