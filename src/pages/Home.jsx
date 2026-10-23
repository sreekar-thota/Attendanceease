import React, { useState } from "react";
import Hero from "../components/Hero";
import StatTile from "../components/StatTile";
import RequestList from "../components/RequestList";
import Shortcuts from "../components/Shortcuts";
import Footer from "../components/Footer";

export default function Home({
  student,
  requests,
  onNewRequest,
  onCancelRequest,
}) {
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Derive counts directly from data - no hardcoded numbers!
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const declinedCount = requests.filter((r) => r.status === "Declined").length;

  // Filter requests based on user selection
  const filteredRequests =
    statusFilter === "ALL"
      ? requests
      : requests.filter((r) => r.status === statusFilter);

  const handleTileSelect = (filterKey) => {
    setStatusFilter((prev) => (prev === filterKey ? "ALL" : filterKey));
  };

  const handleViewAll = () => {
    setStatusFilter("ALL");
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* 1. Hero Section */}
      <Hero
        student={student}
        approvedCount={approvedCount}
        pendingCount={pendingCount}
        onNewRequest={onNewRequest}
      />

      {/* 2. Stat Summary Tiles */}
      <section
        aria-label="Attendance permission status summary"
        className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4"
      >
        <StatTile
          count={approvedCount}
          label="Approved"
          filterKey="Approved"
          isActive={statusFilter === "Approved"}
          onSelect={handleTileSelect}
        />
        <StatTile
          count={pendingCount}
          label="Waiting for review"
          filterKey="Pending"
          isActive={statusFilter === "Pending"}
          onSelect={handleTileSelect}
        />
        <StatTile
          count={declinedCount}
          label="Declined"
          filterKey="Declined"
          isActive={statusFilter === "Declined"}
          onSelect={handleTileSelect}
        />
      </section>

      {/* 3. Filter indicator if active */}
      {statusFilter !== "ALL" && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-[#fff5eb] px-4 py-2 text-xs font-medium text-[#f26a0f] dark:bg-[#2b1f15]">
          <span>
            Filtering by <strong>{statusFilter === "Pending" ? "Waiting for review" : statusFilter}</strong> requests
          </span>
          <button
            type="button"
            onClick={handleViewAll}
            className="font-semibold underline hover:text-[#e05e07]"
          >
            Show all
          </button>
        </div>
      )}

      {/* 4. Recent Requests Section */}
      <RequestList
        requests={filteredRequests}
        onNewRequest={onNewRequest}
        onViewAll={handleViewAll}
        onCancelRequest={onCancelRequest}
      />

      {/* 5. Shortcuts Section */}
      <Shortcuts />

      {/* 6. Footer Section */}
      <Footer />
    </div>
  );
}
