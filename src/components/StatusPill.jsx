import React from "react";

const STATUS_CONFIG = {
  Approved: {
    bgStyle: {
      backgroundColor: "var(--color-approved-bg)",
      color: "var(--color-approved-text)",
      borderColor: "var(--color-approved-border)",
    },
    dotStyle: {
      backgroundColor: "var(--color-approved-dot)",
    },
    label: "Approved",
  },
  Pending: {
    bgStyle: {
      backgroundColor: "var(--color-pending-bg)",
      color: "var(--color-pending-text)",
      borderColor: "var(--color-pending-border)",
    },
    dotStyle: {
      backgroundColor: "var(--color-pending-dot)",
    },
    label: "Waiting for review",
  },
  Declined: {
    bgStyle: {
      backgroundColor: "var(--color-declined-bg)",
      color: "var(--color-declined-text)",
      borderColor: "var(--color-declined-border)",
    },
    dotStyle: {
      backgroundColor: "var(--color-declined-dot)",
    },
    label: "Declined",
  },
};

export default function StatusPill({ status, showFullLabel = false }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const label = showFullLabel ? config.label : status;

  return (
    <span
      style={config.bgStyle}
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors"
      role="status"
    >
      <span
        style={config.dotStyle}
        className="h-2 w-2 rounded-full"
        aria-hidden="true"
      />
      <span>{label}</span>
    </span>
  );
}
