import React from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const VARIANTS = {
  Approved: {
    icon: CheckCircle2,
    badgeBg: "bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300",
  },
  "Waiting for review": {
    icon: Clock3,
    badgeBg: "bg-amber-100/70 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300",
  },
  Declined: {
    icon: XCircle,
    badgeBg: "bg-rose-100/70 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300",
  },
};

export default function StatTile({ count, label, filterKey, isActive, onSelect }) {
  const variant = VARIANTS[label] || VARIANTS.Approved;
  const Icon = variant.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(filterKey)}
      aria-pressed={isActive}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5 focus-visible:outline-2 focus-visible:outline-[#f26a0f] ${
        isActive
          ? "border-[#f26a0f] bg-[#fff5eb]/40 shadow-sm ring-2 ring-[#f26a0f] dark:border-[#f26a0f] dark:bg-[#2d1d12]/50 dark:ring-[#f26a0f]"
          : "border-[#ece4da] bg-white hover:border-[#dfd4c5] hover:shadow-xs dark:border-[#33291f] dark:bg-[#1e1914] dark:hover:border-[#483a2d]"
      }`}
      aria-label={`${label}: ${count} requests${isActive ? " (currently active filter)" : ""}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${variant.badgeBg}`}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 stroke-[2.2]" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-2xl font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8] sm:text-3xl">
            {count}
          </span>
          <span className="text-xs font-medium text-[#6f675f] dark:text-[#a79c91]">
            {count === 1 ? "request" : "requests"}
          </span>
        </div>
        <p className="truncate text-sm font-medium text-[#6f675f] dark:text-[#a79c91]">
          {label}
        </p>
      </div>

      {isActive && (
        <span className="absolute right-3.5 top-3.5 h-2 w-2 rounded-full bg-[#f26a0f]" aria-hidden="true" />
      )}
    </button>
  );
}
