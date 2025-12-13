"use client";

import { useMemo, useState } from "react";
import {
  MoreVertical,
  MessageSquare,
  CheckCircle2,
  FileText,
  ShoppingBag,
  Search,
  Filter,
  Star,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  Review,
  ReviewStatus,
  IssueType,
  Reply,
  InternalNote,
} from "@/data/reviews";
import { reviews as seedReviews } from "@/data/reviews";

const STATUS_COLORS: Record<ReviewStatus, string> = {
  NEW: "bg-yellow-50 text-yellow-700 border-yellow-200",
  RESPONDED: "bg-blue-50 text-blue-700 border-blue-200",
  RESOLVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const ISSUE_TYPE_COLORS: Record<IssueType, string> = {
  Delay: "bg-orange-50 text-orange-700",
  Packaging: "bg-purple-50 text-purple-700",
  "Missing items": "bg-red-50 text-red-700",
  Taste: "bg-pink-50 text-pink-700",
  Other: "bg-gray-50 text-gray-700",
};

// Star Rating Component
function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${star <= rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
            }`}
        />
      ))}
    </div>
  );
}

// Consistent date formatting to avoid hydration errors
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  const hoursStr = hours.toString().padStart(2, "0");
  return `${month} ${day}, ${year}, ${hoursStr}:${minutes} ${ampm}`;
}

function ReviewCard({
  review,
  isActive,
  onSelect,
  onReply,
  onResolve,
  onAddNote,
  onViewOrder,
}: {
  review: Review;
  isActive: boolean;
  onSelect: (review: Review) => void;
  onReply: (review: Review) => void;
  onResolve: (review: Review) => void;
  onAddNote: (review: Review) => void;
  onViewOrder: (review: Review) => void;
}) {
  // Rating badge color
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-emerald-600 text-white";
    if (rating >= 3) return "bg-amber-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div
      className={`group relative border-b border-gray-100 bg-white py-4 px-4 transition-all hover:bg-gray-50 cursor-pointer ${isActive ? "bg-blue-50" : ""}`}
      onClick={() => onSelect(review)}
    >
      {/* Main content row */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <Avatar className="h-10 w-10 flex-shrink-0 bg-gray-200">
          <AvatarFallback className="text-xs font-semibold text-gray-600">
            {review.customer.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Row 1: Name + Rating Badge + Date */}
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-gray-900">{review.customer}</span>
            <Badge
              className={`rounded px-1.5 py-0.5 text-xs font-semibold flex items-center gap-0.5 ${getRatingColor(review.rating)}`}
            >
              {review.rating}
              <Star className="h-3 w-3 fill-current" />
            </Badge>
            <span className="text-xs text-gray-400 ml-auto">{review.date}</span>
          </div>

          {/* Row 2: Order count */}
          <p className="text-xs text-gray-500 mb-2">1 order with you</p>

          {/* Review snippet */}
          <p className="text-sm text-gray-700 line-clamp-2 mb-2">
            {review.comment || review.title}
          </p>

          {/* View review details link */}
          <button
            className="text-sm text-blue-600 font-medium hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(review);
            }}
          >
            View review details →
          </button>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  label,
  timestamp,
  description,
  isLast,
}: {
  label: string;
  timestamp: string;
  description?: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-4 pb-6">
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200" />
      )}
      <div className="relative flex-shrink-0">
        <div className="h-6 w-6 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {description && (
          <p className="text-sm text-gray-600 mt-0.5">{description}</p>
        )}
        <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [selected, setSelected] = useState<Review | null>(reviews[0] ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<ReviewStatus | null>(null);
  const [issueTypeFilter, setIssueTypeFilter] = useState<IssueType | null>(
    null
  );
  const [channelFilter, setChannelFilter] = useState<string | null>(null);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [noteText, setNoteText] = useState("");
  const [resolveNote, setResolveNote] = useState("");
  const [activeReview, setActiveReview] = useState<Review | null>(null);

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
      if (ratingFilter !== null && review.rating !== ratingFilter) {
        return false;
      }
      if (statusFilter && review.status !== statusFilter) {
        return false;
      }
      if (
        issueTypeFilter &&
        !review.issueTypes.includes(issueTypeFilter)
      ) {
        return false;
      }
      if (channelFilter && review.channel !== channelFilter) {
        return false;
      }
      return true;
    });
  }, [
    reviews,
    searchQuery,
    ratingFilter,
    statusFilter,
    issueTypeFilter,
    channelFilter,
  ]);

  const handleReply = (review: Review) => {
    setActiveReview(review);
    setReplyText("");
    setReplyDialogOpen(true);
  };

  const handleResolve = (review: Review) => {
    setActiveReview(review);
    setResolveNote("");
    setResolveDialogOpen(true);
  };

  const handleAddNote = (review: Review) => {
    setActiveReview(review);
    setNoteText("");
    setNoteDialogOpen(true);
  };

  const handleViewOrder = (review: Review) => {
    setActiveReview(review);
    setOrderSheetOpen(true);
  };

  const submitReply = () => {
    if (!activeReview || !replyText.trim()) return;

    const newReply: Reply = {
      id: `reply-${Date.now()}`,
      text: replyText,
      timestamp: new Date().toISOString(),
      author: "Partner Team",
    };

    setReviews((prev) =>
      prev.map((r) =>
        r.id === activeReview.id
          ? {
            ...r,
            replies: [...r.replies, newReply],
            status: r.status === "NEW" ? "RESPONDED" : r.status,
          }
          : r
      )
    );

    if (selected?.id === activeReview.id) {
      setSelected({
        ...selected,
        replies: [...selected.replies, newReply],
        status: selected.status === "NEW" ? "RESPONDED" : selected.status,
      });
    }

    setReplyText("");
    setReplyDialogOpen(false);
    setActiveReview(null);
  };

  const submitResolve = () => {
    if (!activeReview) return;

    setReviews((prev) =>
      prev.map((r) =>
        r.id === activeReview.id
          ? {
            ...r,
            status: "RESOLVED",
            notes: resolveNote.trim()
              ? [
                ...r.notes,
                {
                  id: `note-${Date.now()}`,
                  text: resolveNote,
                  timestamp: new Date().toISOString(),
                  author: "Partner Team",
                },
              ]
              : r.notes,
          }
          : r
      )
    );

    if (selected?.id === activeReview.id) {
      setSelected({
        ...selected,
        status: "RESOLVED",
        notes: resolveNote.trim()
          ? [
            ...selected.notes,
            {
              id: `note-${Date.now()}`,
              text: resolveNote,
              timestamp: new Date().toISOString(),
              author: "Partner Team",
            },
          ]
          : selected.notes,
      });
    }

    setResolveNote("");
    setResolveDialogOpen(false);
    setActiveReview(null);
  };

  const submitNote = () => {
    if (!activeReview || !noteText.trim()) return;

    const newNote: InternalNote = {
      id: `note-${Date.now()}`,
      text: noteText,
      timestamp: new Date().toISOString(),
      author: "Partner Team",
    };

    setReviews((prev) =>
      prev.map((r) =>
        r.id === activeReview.id
          ? { ...r, notes: [...r.notes, newNote] }
          : r
      )
    );

    if (selected?.id === activeReview.id) {
      setSelected({
        ...selected,
        notes: [...selected.notes, newNote],
      });
    }

    setNoteText("");
    setNoteDialogOpen(false);
    setActiveReview(null);
  };

  const changeStatus = (newStatus: ReviewStatus) => {
    if (!selected) return;

    setReviews((prev) =>
      prev.map((r) => (r.id === selected.id ? { ...r, status: newStatus } : r))
    );

    setSelected({ ...selected, status: newStatus });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setRatingFilter(null);
    setStatusFilter(null);
    setIssueTypeFilter(null);
    setChannelFilter(null);
  };

  const hasActiveFilters =
    searchQuery ||
    ratingFilter !== null ||
    statusFilter ||
    issueTypeFilter ||
    channelFilter;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Search & Filter Section */}
        <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
          <CardHeader>
            <div className="space-y-3">
              <div>
                <CardTitle className="text-gray-900">Customer Reviews</CardTitle>
                <CardDescription className="text-gray-500">
                  Manage feedback and support requests
                </CardDescription>
              </div>

              {/* Main Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reviews or customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 rounded-xl h-11 text-base"
                />
              </div>

              {/* Filter Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                    Filters
                  </p>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-6 text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Rating Filter */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1.5">Rating</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant={ratingFilter === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            setRatingFilter(
                              ratingFilter === rating ? null : rating
                            )
                          }
                          className={`h-7 text-xs ${ratingFilter === rating
                            ? "bg-emerald-600 text-white"
                            : ""
                            }`}
                        >
                          {rating} ★
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1.5">Status</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(["NEW", "RESPONDED", "RESOLVED"] as ReviewStatus[]).map(
                        (status) => (
                          <Button
                            key={status}
                            variant={statusFilter === status ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setStatusFilter(
                                statusFilter === status ? null : status
                              )
                            }
                            className={`h-7 text-xs border ${statusFilter === status
                              ? "bg-emerald-600 text-white"
                              : ""
                              }`}
                          >
                            {status}
                          </Button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Issue Type Filter */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1.5">Issue Type</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(["Delay", "Packaging", "Missing items", "Taste"] as IssueType[]).map(
                        (issue) => (
                          <Button
                            key={issue}
                            variant={issueTypeFilter === issue ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setIssueTypeFilter(
                                issueTypeFilter === issue ? null : issue
                              )
                            }
                            className={`h-7 text-xs ${issueTypeFilter === issue
                              ? "bg-emerald-600 text-white"
                              : ""
                              }`}
                          >
                            {issue}
                          </Button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Channel Filter */}
                  <div>
                    <p className="text-xs text-gray-600 mb-1.5">Source</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["App", "WhatsApp", "Website", "In-person"].map(
                        (channel) => (
                          <Button
                            key={channel}
                            variant={channelFilter === channel ? "default" : "outline"}
                            size="sm"
                            onClick={() =>
                              setChannelFilter(
                                channelFilter === channel ? null : channel
                              )
                            }
                            className={`h-7 text-xs ${channelFilter === channel
                              ? "bg-emerald-600 text-white"
                              : ""
                              }`}
                          >
                            {channel}
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Review List - Now in a scrollable panel */}
          <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 text-sm">
                    Reviews ({filteredReviews.length})
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500">
                    {filteredReviews.filter(r => r.status === "NEW").length} new • respond in under 5 mins.
                  </CardDescription>
                </div>
                <Badge className="text-xs font-normal bg-gray-100 text-gray-700">
                  {filteredReviews.filter(r => r.status === "NEW").length} new
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 h-[calc(100vh-280px)] overflow-y-auto pr-2">
                {filteredReviews.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <p className="text-sm">No reviews match your filters</p>
                  </div>
                ) : (
                  filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      isActive={review.id === selected?.id}
                      onSelect={setSelected}
                      onReply={handleReply}
                      onResolve={handleResolve}
                      onAddNote={handleAddNote}
                      onViewOrder={handleViewOrder}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Review Details - REMOVED SEARCH BAR & FILTER */}
          <Card className="rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.05)] lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-900">Review Details</CardTitle>
              <CardDescription className="text-gray-500">
                Full context and conversation history
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selected ? (
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-base font-semibold">
                        {selected.customer.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-lg font-semibold text-gray-900">
                          {selected.customer}
                        </p>
                        <Badge
                          className={`rounded-full text-xs font-medium border ${STATUS_COLORS[selected.status]}`}
                        >
                          {selected.status}
                        </Badge>
                        <Badge className="rounded-full bg-blue-50 text-blue-700 text-xs">
                          {selected.channel}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={selected.rating} size="lg" />
                        <span className="text-sm text-gray-500">({selected.rating}/5)</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted on {selected.date}
                      </p>
                    </div>
                  </div>

                  {/* Review Summary */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                      Summary
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {selected.title}
                    </p>
                  </div>

                  {/* Review Detail */}
                  <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                      Full Review
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selected.comment}
                    </p>
                  </div>

                  {/* Issue Types */}
                  {selected.issueTypes.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                        Issue Types
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selected.issueTypes.map((issue) => (
                          <Badge
                            key={issue}
                            className={`text-xs ${ISSUE_TYPE_COLORS[issue]}`}
                          >
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                      Timeline
                    </p>
                    <div className="space-y-0">
                      <TimelineItem
                        label="Review Posted"
                        timestamp={formatDate(selected.date)}
                        description={selected.title}
                      />
                      {selected.replies.map((reply, idx) => (
                        <TimelineItem
                          key={reply.id}
                          label={`Reply from ${reply.author}`}
                          timestamp={formatDate(reply.timestamp)}
                          description={reply.text}
                          isLast={
                            idx === selected.replies.length - 1 &&
                            selected.notes.length === 0 &&
                            selected.status !== "RESOLVED"
                          }
                        />
                      ))}
                      {selected.status === "RESOLVED" && (
                        <TimelineItem
                          label="Marked as Resolved"
                          timestamp={
                            selected.replies.length > 0
                              ? formatDate(
                                selected.replies[selected.replies.length - 1]
                                  .timestamp
                              )
                              : formatDate(selected.date)
                          }
                          isLast={selected.notes.length === 0}
                        />
                      )}
                      {selected.notes.map((note, idx) => (
                        <TimelineItem
                          key={note.id}
                          label={`Internal Note from ${note.author}`}
                          timestamp={formatDate(note.timestamp)}
                          description={note.text}
                          isLast={idx === selected.notes.length - 1}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Partner Replies */}
                  {selected.replies.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                        Partner Replies ({selected.replies.length})
                      </p>
                      <div className="space-y-3">
                        {selected.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="rounded-xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-gray-900">
                                {reply.author}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(reply.timestamp)}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Internal Notes */}
                  {selected.notes.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                        Internal Notes ({selected.notes.length})
                      </p>
                      <div className="space-y-3">
                        {selected.notes.map((note) => (
                          <div
                            key={note.id}
                            className="rounded-xl border border-amber-100 bg-amber-50 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-semibold text-gray-900">
                                {note.author}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(note.timestamp)}
                              </p>
                            </div>
                            <p className="text-sm text-gray-700">{note.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <Button
                      variant="default"
                      onClick={() => handleReply(selected)}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                    {selected.status !== "RESOLVED" && (
                      <Button
                        variant="outline"
                        onClick={() => handleResolve(selected)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark Resolved
                      </Button>
                    )}
                    {selected.status === "RESOLVED" && (
                      <Button
                        variant="outline"
                        onClick={() => changeStatus("RESPONDED")}
                      >
                        Re-open
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => handleAddNote(selected)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Add Note
                    </Button>
                    {selected.orderId && (
                      <Button
                        variant="outline"
                        onClick={() => handleViewOrder(selected)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        View Order
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-gray-500">
                  <p className="text-sm">Select a review to see details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Customer</DialogTitle>
            <DialogDescription>
              Send a response to {activeReview?.customer}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Your Reply
              </p>
              <Textarea
                placeholder="Type your response here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-32 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReplyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submitReply}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!replyText.trim()}
            >
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Resolve Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Mark as Resolved</DialogTitle>
            <DialogDescription>
              Mark this review as resolved. Add an optional internal note.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">
                Internal Note (Optional)
              </p>
              <Textarea
                placeholder="Add any notes about the resolution..."
                value={resolveNote}
                onChange={(e) => setResolveNote(e.target.value)}
                className="min-h-24 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setResolveDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submitResolve}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Mark Resolved
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Note Dialog */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add Internal Note</DialogTitle>
            <DialogDescription>
              Add a note visible only to your team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Note</p>
              <Textarea
                placeholder="Type your internal note here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="min-h-32 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setNoteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submitNote}
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={!noteText.trim()}
            >
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Order Details Sheet */}
      <Sheet open={orderSheetOpen} onOpenChange={setOrderSheetOpen}>
        <SheetContent className="rounded-l-2xl">
          <SheetHeader>
            <SheetTitle>Order Details</SheetTitle>
            <SheetDescription>
              Order information for {activeReview?.orderId}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                Order ID
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {activeReview?.orderId}
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <p className="text-sm text-gray-600">
                Full order details would be displayed here, including items,
                quantities, pricing, and pickup information.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </AppShell>
  );
}