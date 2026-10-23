import React, { useState } from "react";
import { MoreVertical, Calendar, FileText, Download, Trash2, Eye, Plus } from "lucide-react";
import StatusPill from "./StatusPill";

export default function RequestList({
  requests = [],
  onNewRequest,
  onViewAll,
  onCancelRequest,
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedRequestDetails, setSelectedRequestDetails] = useState(null);

  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const closeMenu = () => setActiveMenuId(null);

  return (
    <section aria-labelledby="recent-requests-heading" className="mt-8">
      {/* Header with Title, Description, and View All */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="recent-requests-heading"
            className="font-heading text-xl font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8] sm:text-2xl"
          >
            Recent requests
          </h2>
          <p className="text-sm text-[#6f675f] dark:text-[#a79c91]">
            Your latest permission applications
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-[#ece4da] bg-white px-4 text-sm font-semibold text-[#1d1a17] transition-colors hover:border-[#f26a0f] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8] dark:hover:border-[#f26a0f] dark:hover:text-[#f26a0f]"
        >
          View all
        </button>
      </div>

      {/* Empty State */}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#ece4da] bg-white px-6 py-12 text-center dark:border-[#33291f] dark:bg-[#1e1914]">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-[#f5efe7] text-[#f26a0f] dark:bg-[#2d1d12]">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="font-heading text-lg font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
            No requests yet
          </p>
          <p className="mt-1 max-w-sm text-sm text-[#6f675f] dark:text-[#a79c91]">
            Create a request when you need permission for a class, lab session, or college event.
          </p>
          <button
            type="button"
            onClick={onNewRequest}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#f26a0f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e05e07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            <span>New request</span>
          </button>
        </div>
      ) : (
        /* Requests Container: Desktop List + Mobile Cards */
        <div className="overflow-hidden rounded-2xl border border-[#ece4da] bg-white shadow-xs dark:border-[#33291f] dark:bg-[#1e1914]">
          {/* Desktop Table Header (>= 900px) */}
          <div className="desktop-table-header border-b border-[#ece4da] bg-[#fbf8f4] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#6f675f] dark:border-[#33291f] dark:bg-[#16120e] dark:text-[#a79c91] grid-cols-[100px_1.2fr_1.8fr_140px_110px_48px] items-center gap-4">
            <div>Date</div>
            <div>Subject</div>
            <div>Details</div>
            <div>Status</div>
            <div>Submitted</div>
            <div className="text-right sr-only">Actions</div>
          </div>

          {/* List of Requests */}
          <ul className="divide-y divide-[#ece4da] dark:divide-[#33291f]" role="list">
            {requests.map((r) => (
              <li
                key={r.id}
                className="group relative transition-colors hover:bg-[#fbf8f4]/80 dark:hover:bg-[#26201b]/70"
              >
                {/* Desktop Grid Layout (>= 900px) */}
                <div className="desktop-table-row px-5 py-4 grid-cols-[100px_1.2fr_1.8fr_140px_110px_48px] items-center gap-4">
                  {/* Date with Weekday */}
                  <div>
                    <span className="block font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                      {r.date}
                    </span>
                    <span className="block text-xs text-[#6f675f] dark:text-[#a79c91]">
                      {r.day}
                    </span>
                  </div>

                  {/* Subject */}
                  <div className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                    {r.subject}
                  </div>

                  {/* Details */}
                  <div className="truncate text-sm text-[#6f675f] dark:text-[#a79c91]">
                    {r.details}
                  </div>

                  {/* Status Pill */}
                  <div>
                    <StatusPill status={r.status} />
                  </div>

                  {/* Submitted Ago */}
                  <div className="text-sm text-[#6f675f] dark:text-[#a79c91]">
                    {r.ago}
                  </div>

                  {/* Row Actions Menu Button */}
                  <div className="relative flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => toggleMenu(r.id, e)}
                      aria-label={`More actions for ${r.subject}`}
                      aria-expanded={activeMenuId === r.id}
                      className="grid h-11 w-11 place-items-center rounded-xl text-[#6f675f] transition-colors hover:bg-[#ece4da]/60 hover:text-[#1d1a17] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:text-[#a79c91] dark:hover:bg-[#33291f] dark:hover:text-[#f6efe8]"
                    >
                      <MoreVertical className="h-4 w-4" aria-hidden="true" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenuId === r.id && (
                      <div
                        className="absolute right-0 top-12 z-20 w-48 rounded-xl border border-[#ece4da] bg-white py-1.5 shadow-lg dark:border-[#33291f] dark:bg-[#1e1914]"
                        role="menu"
                        onMouseLeave={closeMenu}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRequestDetails(r);
                            closeMenu();
                          }}
                          className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs font-medium text-[#1d1a17] hover:bg-[#fbf8f4] dark:text-[#f6efe8] dark:hover:bg-[#2a231c]"
                          role="menuitem"
                        >
                          <Eye className="h-4 w-4 text-[#6f675f] dark:text-[#a79c91]" />
                          <span>View permit details</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            alert(`Downloading attendance permit slip for "${r.subject}"`);
                            closeMenu();
                          }}
                          className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs font-medium text-[#1d1a17] hover:bg-[#fbf8f4] dark:text-[#f6efe8] dark:hover:bg-[#2a231c]"
                          role="menuitem"
                        >
                          <Download className="h-4 w-4 text-[#6f675f] dark:text-[#a79c91]" />
                          <span>Download PDF slip</span>
                        </button>
                        {r.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Withdraw request for ${r.subject}?`)) {
                                onCancelRequest && onCancelRequest(r.id);
                              }
                              closeMenu();
                            }}
                            className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/30"
                            role="menuitem"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Withdraw request</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Card Layout (< 900px) */}
                <div className="mobile-card-row p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5efe7] text-xs font-bold text-[#1d1a17] dark:bg-[#2d1d12] dark:text-[#f6efe8]">
                        <span>{r.date.split(" ")[0]}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-heading text-base font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                          {r.subject}
                        </h3>
                        <p className="text-xs text-[#6f675f] dark:text-[#a79c91]">
                          {r.date} ({r.day}) &middot; {r.ago}
                        </p>
                      </div>
                    </div>

                    <StatusPill status={r.status} />
                  </div>

                  <p className="mt-2.5 rounded-lg bg-[#fbf8f4] px-3 py-2 text-xs text-[#6f675f] dark:bg-[#14100d] dark:text-[#a79c91]">
                    {r.details}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#ece4da]/60 pt-2.5 dark:border-[#33291f]/60">
                    <span className="text-[11px] text-[#6f675f] dark:text-[#a79c91]">
                      Category: {r.type || "Academic"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedRequestDetails(r)}
                      className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-[#f26a0f] hover:underline"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Details Modal if user clicked view */}
      {selectedRequestDetails && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="details-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-2xl border border-[#ece4da] bg-white p-6 shadow-xl dark:border-[#33291f] dark:bg-[#1e1914]">
            <div className="flex items-center justify-between">
              <h3 id="details-title" className="font-heading text-lg font-bold text-[#1d1a17] dark:text-[#f6efe8]">
                Request Details
              </h3>
              <StatusPill status={selectedRequestDetails.status} />
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl bg-[#fbf8f4] p-3 dark:bg-[#14100d]">
                <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Subject</span>
                <p className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                  {selectedRequestDetails.subject}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[#fbf8f4] p-3 dark:bg-[#14100d]">
                  <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Date</span>
                  <p className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                    {selectedRequestDetails.date} ({selectedRequestDetails.day})
                  </p>
                </div>
                <div className="rounded-xl bg-[#fbf8f4] p-3 dark:bg-[#14100d]">
                  <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Submitted</span>
                  <p className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                    {selectedRequestDetails.ago}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#fbf8f4] p-3 dark:bg-[#14100d]">
                <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Reason / Specific Details</span>
                <p className="mt-1 text-sm text-[#1d1a17] dark:text-[#f6efe8]">
                  {selectedRequestDetails.details}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedRequestDetails(null)}
                className="min-h-[44px] rounded-xl border border-[#ece4da] px-5 text-sm font-semibold text-[#1d1a17] hover:bg-[#fbf8f4] dark:border-[#33291f] dark:text-[#f6efe8] dark:hover:bg-[#2a231c]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
