import React from "react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

const VARIANTS = {
  Approved: {
    icon: CheckCircle2,
    shortLabel: "Approved",
    badgeBg: "bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300",
  },
  Waiting: {
    icon: Clock3,
    shortLabel: "Waiting",
    badgeBg: "bg-amber-100/70 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300",
  },
  "Waiting for review": {
    icon: Clock3,
    shortLabel: "Waiting",
    badgeBg: "bg-amber-100/70 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300",
  },
  Declined: {
    icon: XCircle,
    shortLabel: "Declined",
    badgeBg: "bg-rose-100/70 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300",
  },
};

export default function StatTile({ count, label, filterKey, isActive, onSelect }) {
  const variant = VARIANTS[label] || VARIANTS.Approved;
  const Icon = variant.icon;
  const displayLabel = variant.shortLabel || label;

  return (
    <button
      type="button"
      onClick={() => onSelect && onSelect(filterKey)}
      aria-pressed={isActive}
      className={`group relative flex w-full items-center gap-2 sm:gap-3.5 rounded-2xl border px-2.5 py-2.5 sm:p-4 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#f26a0f] min-h-[52px] max-[359px]:max-h-[64px] ${
        isActive
          ? "border-[#f26a0f] bg-[#fff5eb]/40 shadow-sm ring-2 ring-[#f26a0f] dark:border-[#f26a0f] dark:bg-[#2d1d12]/50 dark:ring-[#f26a0f]"
          : "border-[#ece4da] bg-white hover:border-[#dfd4c5] hover:shadow-xs dark:border-[#33291f] dark:bg-[#1e1914] dark:hover:border-[#483a2d]"
      }`}
      aria-label={`${displayLabel}: ${count}${isActive ? " (currently active filter)" : ""}`}
    >
      <div
        className={`flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${variant.badgeBg}`}
        aria-hidden="true"
      >
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.2]" />
      </div>

      <div className="min-w-0 flex-1">
        <span className="block font-heading text-lg sm:text-2xl font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8] leading-tight">
          {count}
        </span>
        <p className="text-[11px] sm:text-xs font-medium text-[#6f675f] dark:text-[#a79c91] leading-tight whitespace-nowrap sm:whitespace-normal">
          {displayLabel}
        </p>
      </div>

      {isActive && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#f26a0f]" aria-hidden="true" />
      )}
    </button>
  );
}
