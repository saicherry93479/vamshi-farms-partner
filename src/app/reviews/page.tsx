"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Star,
  HelpCircle,
  FileText,
  Send,
  SlidersHorizontal,
  X,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Review } from "@/data/reviews";
import { reviews as seedReviews } from "@/data/reviews";

// Helper to calculate relative time
function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";
  return `${Math.floor(diffDays / 30)} months ago`;
}

// Helper to format date
function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  return `${hour12}:${minutes} ${ampm} | ${day} ${month}`;
}

// Rating Badge Component
function RatingBadge({ rating }: { rating: number }) {
  const getBgColor = () => {
    if (rating >= 4) return "bg-green-600";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <span
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold text-white ${getBgColor()}`}
    >
      {rating}
      <Star className="h-3 w-3 fill-white" />
    </span>
  );
}

// Review List Item Component
function ReviewListItem({
  review,
  isActive,
  onSelect,
}: {
  review: Review;
  isActive: boolean;
  onSelect: (review: Review) => void;
}) {
  return (
    <div
      className={`border-b border-gray-100 py-4 px-4 cursor-pointer transition-colors ${
        isActive ? "bg-gray-50" : "hover:bg-gray-50"
      }`}
      onClick={() => onSelect(review)}
    >
      {/* Header row: Avatar, Name, Orders, Rating, Time */}
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0 bg-slate-200">
          <AvatarFallback className="text-sm font-medium text-slate-600 bg-slate-200">
            {review.customer.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-semibold text-gray-900">
                {review.customer}
              </span>
              <p className="text-xs text-gray-500">1 order with you</p>
            </div>
            <div className="flex items-center gap-2">
              <RatingBadge rating={review.rating} />
              <span className="text-xs text-gray-400">
                {getRelativeTime(review.date)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-700 mt-3 line-clamp-2">
        {review.comment || review.title}
      </p>

      {/* View details link */}
      <button
        className="text-sm text-blue-600 font-medium mt-2 hover:underline inline-flex items-center gap-1"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(review);
        }}
      >
        View review details
        <span className="text-blue-600">▸</span>
      </button>
    </div>
  );
}

// Order Details View Component (shown in the right panel)
function OrderDetailsView({
  review,
  onClose,
}: {
  review: Review;
  onClose: () => void;
}) {
  const timelineSteps = [
    { label: "Placed", time: "11:50 AM", status: "completed" },
    { label: "Accepted", time: "11:52 AM", status: "completed" },
    { label: "Ready", time: "11:52 AM", status: "error", badge: "INCORRECT" },
    { label: "Delivery partner arrived", time: "12:08 PM", status: "completed" },
    { label: "Picked up", time: "12:13 PM", status: "completed" },
    { label: "Delivered", time: "12:37 PM", status: "completed" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div>
          <p className="text-base font-semibold text-gray-900">
            ID: {review.orderId || "N/A"}
          </p>
          <p className="text-sm text-gray-500">Oka Manchi Katha, Ghatkesar</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {formatDateTime(review.date)}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Help
          </Button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Delivery Status */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-semibold rounded">
              DELIVERED
            </span>
            <span className="text-sm text-gray-600">
              1 order by {review.customer.split(" ")[0]}
            </span>
          </div>
        </div>

        {/* Customer Complaint */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Customer Complaint
              </p>
              <p className="text-sm text-gray-700">
                Refund ₹100 given to customer
              </p>
              <button className="text-sm text-blue-600 font-medium mt-1 hover:underline inline-flex items-center gap-1">
                View details
                <span>▸</span>
              </button>
            </div>
            <span className="text-sm font-semibold text-green-600">
              RESOLVED
            </span>
          </div>
        </div>

        {/* Customer Rating */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">Customer rating</span>
            <RatingBadge rating={review.rating} />
          </div>
          <p className="text-sm text-gray-700">
            &quot;{review.comment || review.title}&quot;
          </p>
        </div>

        {/* Order Timeline */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Order Timeline
            </p>
            <span className="text-sm text-gray-600">
              Delivered in 47 minutes
            </span>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="flex items-start justify-between">
              {timelineSteps.map((step, index) => (
                <div key={step.label} className="flex flex-col items-center relative flex-1">
                  {/* Connector line */}
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute top-3 left-1/2 w-full h-0.5 bg-green-500" />
                  )}
                  
                  {/* Icon */}
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center ${
                      step.status === "error"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  >
                    {step.status === "error" ? (
                      <AlertCircle className="h-4 w-4 text-white" />
                    ) : (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>

                  {/* Label and Time */}
                  <p className="text-[10px] text-gray-700 mt-2 text-center leading-tight">
                    {step.label}
                  </p>
                  <p className="text-[10px] text-gray-500">{step.time}</p>

                  {/* Error Badge */}
                  {step.badge && (
                    <>
                      <span className="mt-1 px-1.5 py-0.5 bg-orange-500 text-white text-[9px] font-semibold rounded">
                        {step.badge}
                      </span>
                      <button className="text-[10px] text-blue-600 font-medium mt-0.5 hover:underline">
                        View
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Order Details
            </p>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <FileText className="h-4 w-4 mr-1" />
              ORDER
            </Button>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-900 font-medium underline">
                1 x Breakfast Combo [Mini]
              </span>
              <span className="text-sm text-gray-900">₹249</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>1 item</span>
              <span>₹249</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Restaurant Packaging Charges</span>
              <span>₹5</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="border-b border-dashed border-gray-300">
                Taxes
              </span>
              <span>₹0</span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="border-b border-dashed border-gray-300">
                Discount
              </span>
              <span>-₹80</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  Total Bill
                </span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  PAID
                </span>
              </div>
              <span className="text-sm font-semibold text-gray-900">₹174</span>
            </div>
          </div>
        </div>

        {/* Delivery Partner Info */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-orange-100">
              <AvatarFallback className="text-sm font-medium text-orange-600 bg-orange-100">
                Y
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">
              Yelchala delivered the order at 12:37 PM
            </span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Customer Details
            </p>
            <button className="text-sm text-blue-600 font-medium hover:underline inline-flex items-center gap-1">
              Know more
              <span>▸</span>
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex">
              <span className="text-sm text-gray-500 w-40">Name:</span>
              <span className="text-sm text-gray-900">{review.customer}</span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-500 w-40">
                Orders placed till date:
              </span>
              <span className="text-sm text-gray-900">1</span>
            </div>
            <div className="flex">
              <span className="text-sm text-gray-500 w-40">Locality:</span>
              <span className="text-sm text-gray-900">
                Medha Consultancy, Hyderabad, Hyderabad (3 kms, 9 mins away)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Review Details View Component (shown in the right panel)
function ReviewDetailsView({
  review,
  replyText,
  setReplyText,
  onSendReply,
  onShowOrderDetails,
}: {
  review: Review;
  replyText: string;
  setReplyText: (text: string) => void;
  onSendReply: () => void;
  onShowOrderDetails: () => void;
}) {
  return (
    <>
      {/* Restaurant Info Header */}
      <div className="flex items-start justify-between p-6 border-b border-gray-100">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Oka Manchi Katha, Ghatkesar
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {getRelativeTime(review.date)}
          </p>
          <p className="text-sm text-gray-500">
            Order ID: {review.orderId || "N/A"}
          </p>
        </div>
        <Button
          variant="outline"
          className="text-sm font-medium text-gray-700 border-gray-300"
          onClick={onShowOrderDetails}
        >
          <FileText className="h-4 w-4 mr-2" />
          Order details
        </Button>
      </div>

      {/* Review Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Customer Info */}
        <div className="flex items-start gap-3 mb-6">
          <Avatar className="h-10 w-10 flex-shrink-0 bg-slate-200">
            <AvatarFallback className="text-sm font-medium text-slate-600 bg-slate-200">
              {review.customer.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  {review.customer}
                </span>
                <p className="text-xs text-gray-500">
                  1 order with you
                </p>
              </div>
              <RatingBadge rating={review.rating} />
            </div>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-sm text-gray-800 leading-relaxed">
          {review.comment || review.title}
        </p>

        {/* Previous Replies */}
        {review.replies.length > 0 && (
          <div className="mt-8 space-y-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Your Replies
            </p>
            {review.replies.map((reply) => (
              <div
                key={reply.id}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {reply.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getRelativeTime(reply.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{reply.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Type your reply here"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1 h-11 border-gray-200 rounded-lg text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendReply();
              }
            }}
          />
          <Button
            onClick={onSendReply}
            disabled={!replyText.trim()}
            className="h-11 w-11 p-0 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default function ReviewsPage() {
  const [reviews] = useState<Review[]>(seedReviews);
  const [selected, setSelected] = useState<Review | null>(reviews[0] ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !review.customer.toLowerCase().includes(query) &&
          !review.title.toLowerCase().includes(query) &&
          !review.comment.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [reviews, searchQuery]);

  const handleSendReply = () => {
    if (!replyText.trim() || !selected) return;
    // Handle reply submission
    console.log("Sending reply:", replyText);
    setReplyText("");
  };

  const handleSelectReview = (review: Review) => {
    setSelected(review);
    setShowOrderDetails(false); // Reset to review view when selecting a new review
  };

  return (
    <AppShell noPadding>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <h1 className="text-sm text-gray-700">
              Delivery reviews are only visible to you
            </h1>
            <Info className="h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter Button */}
            <Button
              variant="outline"
              className="text-sm font-medium text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filter
            </Button>

            {/* FAQs Link */}
            <Button
              variant="ghost"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              FAQs
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Review List */}
          <div className="w-[460px] border-r border-gray-200 flex flex-col bg-white">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reviews"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 border-gray-200 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Review List */}
            <div className="flex-1 overflow-y-auto">
              {filteredReviews.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-sm">No reviews found</p>
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <ReviewListItem
                    key={review.id}
                    review={review}
                    isActive={review.id === selected?.id}
                    onSelect={handleSelectReview}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Panel - Review Details or Order Details */}
          <div className="flex-1 flex flex-col bg-white">
            {selected ? (
              showOrderDetails ? (
                <OrderDetailsView
                  review={selected}
                  onClose={() => setShowOrderDetails(false)}
                />
              ) : (
                <ReviewDetailsView
                  review={selected}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  onSendReply={handleSendReply}
                  onShowOrderDetails={() => setShowOrderDetails(true)}
                />
              )
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p className="text-sm">Select a review to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
