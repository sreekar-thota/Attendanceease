import React, { useState, useEffect, useMemo } from "react";
import { X, AlertCircle, Plus, Minus, Calendar, Zap, FileText, BookOpen, User, ChevronDown } from "lucide-react";
import { FACULTY_LIST, PRESET_REASONS } from "../data/mock";

export const PERIOD_SLOTS = [
  { id: 1, label: "P1", time: "9:00 – 9:45", start: "09:00 AM", end: "09:45 AM" },
  { id: 2, label: "P2", time: "9:45 – 10:30", start: "09:45 AM", end: "10:30 AM" },
  { id: 3, label: "P3", time: "10:30 – 11:15", start: "10:30 AM", end: "11:15 AM" },
  { id: 4, label: "P4", time: "11:15 – 12:00", start: "11:15 AM", end: "12:00 PM" },
  { id: 5, label: "P5", time: "1:30 – 2:15", start: "01:30 PM", end: "02:15 PM" },
  { id: 6, label: "P6", time: "2:15 – 3:00", start: "02:15 PM", end: "03:00 PM" },
  { id: 7, label: "P7", time: "3:00 – 3:45", start: "03:00 PM", end: "03:45 PM" },
  { id: 8, label: "P8", time: "3:45 – 4:30", start: "03:45 PM", end: "04:30 PM" },
];

export default function NewRequestModal({ isOpen, onClose, onSubmitRequest }) {
  const [formData, setFormData] = useState({
    type: "Academic",
    durationType: "Short", // "Short" (periods) or "Long" (full day)
    subject: "",
    reason: "",
    faculty: "",
    date: new Date().toISOString().split("T")[0],
    periods: 2,
    details: "",
  });
  const [selectedPeriods, setSelectedPeriods] = useState([1, 2]);
  const [error, setError] = useState("");
  const [periodError, setPeriodError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute time badge text from selected periods (e.g. "09:00 AM – 10:30 AM")
  const timeRangeText = useMemo(() => {
    if (selectedPeriods.length === 0) return "No periods selected";
    const sorted = [...selectedPeriods].sort((a, b) => a - b);
    const first = PERIOD_SLOTS.find((p) => p.id === sorted[0]);
    const last = PERIOD_SLOTS.find((p) => p.id === sorted[sorted.length - 1]);
    if (!first || !last) return "";
    return `${first.start} – ${last.end}`;
  }, [selectedPeriods]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePeriod = (pId) => {
    let next;
    if (selectedPeriods.includes(pId)) {
      next = selectedPeriods.filter((id) => id !== pId);
    } else {
      next = [...selectedPeriods, pId].sort((a, b) => a - b);
    }
    setSelectedPeriods(next);
    setFormData((prev) => ({ ...prev, periods: next.length }));
    if (next.length === 0) {
      setPeriodError("Please select at least 1 period (max 8).");
    } else {
      setPeriodError("");
    }
  };

  const handlePeriodStepper = (targetCount) => {
    const num = Math.max(1, Math.min(8, targetCount));
    // Fill from 1 to num
    const next = Array.from({ length: num }, (_, i) => i + 1);
    setSelectedPeriods(next);
    setFormData((prev) => ({ ...prev, periods: num }));
    setPeriodError("");
  };

  const handleDurationTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, durationType: type }));
    if (type === "Long") {
      // Select all 8 periods for full day
      const all = [1, 2, 3, 4, 5, 6, 7, 8];
      setSelectedPeriods(all);
      setFormData((prev) => ({ ...prev, periods: 8 }));
      setPeriodError("");
    } else {
      // Default to 2 periods
      setSelectedPeriods([1, 2]);
      setFormData((prev) => ({ ...prev, periods: 2 }));
      setPeriodError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() && !formData.reason) {
      setError("Please provide a subject or select a reason for absence.");
      return;
    }

    if (!formData.details.trim() || !formData.date) {
      setError("Please complete all required fields.");
      return;
    }

    const numPeriods = Number(formData.periods);
    if (!Number.isInteger(numPeriods) || numPeriods < 1 || numPeriods > 8) {
      setPeriodError("Please select between 1 and 8 periods.");
      return;
    }

    setIsSubmitting(true);

    // Format the date into e.g. "15 Oct" and Day "Thu"
    const parsedDate = new Date(formData.date);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const formattedDate = `${String(parsedDate.getDate()).padStart(2, "0")} ${monthNames[parsedDate.getMonth()]}`;
    const dayOfWeek = dayNames[parsedDate.getDay()];

    const finalSubject = formData.subject.trim() || formData.reason || "General Permission";

    const newRequest = {
      id: Date.now(),
      date: formattedDate,
      day: dayOfWeek,
      subject: finalSubject,
      details: formData.details.trim(),
      reason: formData.reason,
      faculty: formData.faculty || "Dr. K. Suresh Babu (HOD, Dept of CSD & CSIT)",
      periods: numPeriods,
      periodSlots: selectedPeriods,
      periodTime: timeRangeText,
      durationType: formData.durationType,
      status: "Pending",
      ago: "Just now",
      type: formData.type,
    };

    onSubmitRequest(newRequest);
    setIsSubmitting(false);
    onClose();

    // Reset form
    setFormData({
      type: "Academic",
      durationType: "Short",
      subject: "",
      reason: "",
      faculty: "",
      date: new Date().toISOString().split("T")[0],
      periods: 2,
      details: "",
    });
    setSelectedPeriods([1, 2]);
    setError("");
    setPeriodError("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 p-0 sm:p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-t-[28px] sm:rounded-3xl border border-[#ece4da] bg-white shadow-2xl transition-all dark:border-[#33291f] dark:bg-[#1e1914] max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#ece4da] p-5 sm:p-6 dark:border-[#33291f] shrink-0">
          <div>
            <h2
              id="modal-title"
              className="font-heading text-xl font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8]"
            >
              New attendance request
            </h2>
            <p className="mt-0.5 text-xs text-[#6f675f] dark:text-[#a79c91]">
              SRKR Engineering College permission workflow
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-10 w-10 place-items-center rounded-xl text-[#6f675f] transition-colors hover:bg-[#fbf8f4] hover:text-[#1d1a17] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:text-[#a79c91] dark:hover:bg-[#28221b] dark:hover:text-[#f6efe8]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
              >
                <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}

            {/* Permission Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                Permission type <span className="text-[#f26a0f]">*</span>
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {["Academic", "Medical", "Event"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t })}
                    className={`h-12 min-h-[48px] rounded-xl border text-xs font-semibold transition-all ${
                      formData.type === t
                        ? "border-[#f26a0f] bg-[#fff5eb] text-[#f26a0f] ring-1 ring-[#f26a0f] dark:bg-[#2d1d12]"
                        : "border-[#ece4da] bg-white text-[#1d1a17] hover:border-[#dfd4c5] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject / Title */}
            <div>
              <label
                htmlFor="request-subject"
                className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]"
              >
                Subject / Activity name <span className="text-[#f26a0f]">*</span>
              </label>
              <input
                id="request-subject"
                type="text"
                required
                placeholder="e.g. Bluconn interview"
                value={formData.subject}
                onChange={(e) => {
                  setFormData({ ...formData, subject: e.target.value });
                  setError("");
                }}
                className="mt-1.5 w-full h-12 min-h-[48px] rounded-xl border border-[#ece4da] bg-white px-3.5 text-sm text-[#1d1a17] transition-colors placeholder:text-[#968c82] focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
              />
            </div>

            {/* Request Type & Duration Section */}
            <div className="rounded-2xl border border-[#ece4da] dark:border-[#33291f] bg-[#fbf9f6] dark:bg-[#191410] p-4 space-y-3.5">
              {/* Section Header */}
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#fff5eb] text-[#f26a0f] dark:bg-[#2d1d12]">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="font-heading text-sm font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8]">
                  Request Type &amp; Duration
                </span>
              </div>

              {/* Duration Tabs: Short vs Long */}
              <div className="grid grid-cols-2 rounded-xl bg-[#ece4da]/60 dark:bg-[#28221b] p-1 border border-[#ece4da] dark:border-[#33291f]">
                <button
                  type="button"
                  onClick={() => handleDurationTypeChange("Short")}
                  className={`flex items-center justify-center gap-1.5 h-10 rounded-lg text-xs font-semibold transition-all ${
                    formData.durationType === "Short"
                      ? "bg-white text-[#f26a0f] shadow-xs dark:bg-[#191410] ring-1 ring-[#f26a0f]/20"
                      : "text-[#6f675f] hover:text-[#1d1a17] dark:text-[#a79c91] dark:hover:text-[#f6efe8]"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Short</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDurationTypeChange("Long")}
                  className={`flex items-center justify-center gap-1.5 h-10 rounded-lg text-xs font-semibold transition-all ${
                    formData.durationType === "Long"
                      ? "bg-white text-[#f26a0f] shadow-xs dark:bg-[#191410] ring-1 ring-[#f26a0f]/20"
                      : "text-[#6f675f] hover:text-[#1d1a17] dark:text-[#a79c91] dark:hover:text-[#f6efe8]"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Long</span>
                </button>
              </div>

              {/* Permission Date */}
              <div>
                <label
                  htmlFor="request-date"
                  className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]"
                >
                  Permission Date <span className="text-[#f26a0f]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="request-date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      setError("");
                    }}
                    className="w-full h-12 min-h-[48px] rounded-xl border border-[#ece4da] bg-white px-3.5 text-sm text-[#1d1a17] transition-colors focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
                  />
                </div>
              </div>

              {/* Select Periods Header with Badge */}
              <div className="pt-1">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                    Select Periods <span className="text-[#f26a0f]">*</span>
                  </label>
                  <span className="font-heading font-semibold text-xs px-2.5 py-1 rounded-lg bg-[#fff5eb] text-[#f26a0f] border border-[#f26a0f]/20 dark:bg-[#2d1d12] dark:border-[#f26a0f]/30">
                    {timeRangeText}
                  </span>
                </div>

                {/* Periods Grid (P1-P8 in 2 rows of 4) */}
                <div className="mt-2.5 grid grid-cols-4 gap-2">
                  {PERIOD_SLOTS.map((slot) => {
                    const isSelected = selectedPeriods.includes(slot.id);
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => togglePeriod(slot.id)}
                        className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? "border-2 border-[#f26a0f] bg-[#fff8f3] dark:bg-[#2d1d12] ring-1 ring-[#f26a0f]/25 shadow-xs"
                            : "border border-[#ece4da] bg-white hover:border-[#dfd4c5] hover:bg-[#faf7f3] dark:border-[#33291f] dark:bg-[#14100d] dark:hover:border-[#4d3d2e]"
                        }`}
                      >
                        <span
                          className={`font-heading font-bold text-sm leading-tight ${
                            isSelected
                              ? "text-[#f26a0f]"
                              : "text-[#1d1a17] dark:text-[#f6efe8]"
                          }`}
                        >
                          {slot.label}
                        </span>
                        <span
                          className={`text-[10px] leading-tight font-medium mt-0.5 text-center ${
                            isSelected
                              ? "text-[#d95a06] dark:text-[#f7944d]"
                              : "text-[#786e65] dark:text-[#a79c91]"
                          }`}
                        >
                          {slot.time}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Stepper Counter */}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[#6f675f] dark:text-[#a79c91]">
                      {selectedPeriods.length === 1
                        ? "1 period selected (45m)"
                        : `${selectedPeriods.length} periods selected (${selectedPeriods.length * 45}m)`}
                    </span>
                  </div>
                  <div className="inline-flex items-center rounded-lg border border-[#ece4da] bg-white dark:border-[#33291f] dark:bg-[#14100d] p-0.5">
                    <button
                      type="button"
                      onClick={() => handlePeriodStepper(selectedPeriods.length - 1)}
                      disabled={selectedPeriods.length <= 1}
                      aria-label="Decrease period count"
                      className="grid h-7 w-7 place-items-center rounded text-[#6f675f] hover:bg-[#fbf8f4] hover:text-[#1d1a17] disabled:opacity-30 disabled:pointer-events-none dark:text-[#a79c91] dark:hover:bg-[#28221b] dark:hover:text-[#f6efe8]"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-7 text-center font-heading font-bold text-xs text-[#1d1a17] dark:text-[#f6efe8]">
                      {selectedPeriods.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePeriodStepper(selectedPeriods.length + 1)}
                      disabled={selectedPeriods.length >= 8}
                      aria-label="Increase period count"
                      className="grid h-7 w-7 place-items-center rounded text-[#6f675f] hover:bg-[#fbf8f4] hover:text-[#1d1a17] disabled:opacity-30 disabled:pointer-events-none dark:text-[#a79c91] dark:hover:bg-[#28221b] dark:hover:text-[#f6efe8]"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {periodError && (
                  <p className="mt-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                    {periodError}
                  </p>
                )}
              </div>
            </div>

            {/* Reason for Absence Card */}
            <div className="rounded-2xl border border-[#ece4da] dark:border-[#33291f] bg-[#fbf9f6] dark:bg-[#191410] p-4 space-y-3.5">
              {/* Card Header */}
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#fff5eb] text-[#f26a0f] dark:bg-[#2d1d12]">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="font-heading text-sm font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8]">
                  Reason for Absence
                </span>
              </div>

              {/* Select Reason */}
              <div>
                <label
                  htmlFor="request-reason"
                  className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]"
                >
                  Select Reason <span className="text-[#f26a0f]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6f675f] dark:text-[#a79c91]">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <select
                    id="request-reason"
                    value={formData.reason}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        reason: val,
                        subject: prev.subject && prev.subject !== prev.reason ? prev.subject : (val === "Other" ? "" : val),
                      }));
                      setError("");
                    }}
                    className="w-full h-12 min-h-[48px] appearance-none rounded-xl border border-[#ece4da] bg-white pl-10 pr-9 text-sm text-[#1d1a17] transition-colors focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
                  >
                    <option value="" disabled>
                      Select a reason...
                    </option>
                    {PRESET_REASONS.map((r) => (
                      <option key={r} value={r} className="bg-white text-[#1d1a17] dark:bg-[#1e1914] dark:text-[#f6efe8]">
                        {r}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6f675f] dark:text-[#a79c91]">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Point to Faculty Member(s) */}
              <div>
                <label
                  htmlFor="request-faculty"
                  className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]"
                >
                  Point to Faculty Member(s) <span className="text-[#f26a0f]">*</span>
                </label>
                <div className="relative mt-1.5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6f675f] dark:text-[#a79c91]">
                    <User className="h-4 w-4" />
                  </div>
                  <select
                    id="request-faculty"
                    value={formData.faculty}
                    onChange={(e) => {
                      setFormData({ ...formData, faculty: e.target.value });
                      setError("");
                    }}
                    className="w-full h-12 min-h-[48px] appearance-none rounded-xl border border-[#ece4da] bg-white pl-10 pr-9 text-sm text-[#1d1a17] transition-colors focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
                  >
                    <option value="" disabled>
                      Select Faculty Member from dropdown...
                    </option>
                    {FACULTY_LIST.map((f) => (
                      <option key={f.id} value={`${f.name} (${f.role})`} className="bg-white text-[#1d1a17] dark:bg-[#1e1914] dark:text-[#f6efe8]">
                        {f.name} — {f.role}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#6f675f] dark:text-[#a79c91]">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[#6f675f] dark:text-[#a79c91] leading-relaxed">
                  Only selected faculty members (e.g. Class Mentor, Counselor, Subject Teacher) will be authorized to view &amp; approve your request.
                </p>
              </div>
            </div>

            {/* Details / Reason */}
            <div>
              <label
                htmlFor="request-details"
                className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]"
              >
                Reason / Specific details <span className="text-[#f26a0f]">*</span>
              </label>
              <textarea
                id="request-details"
                required
                rows={3}
                placeholder="Provide context for faculty and HOD review (e.g. company name, location, timing)..."
                value={formData.details}
                onChange={(e) => {
                  setFormData({ ...formData, details: e.target.value });
                  setError("");
                }}
                className="mt-1.5 w-full rounded-xl border border-[#ece4da] bg-white p-3 text-sm text-[#1d1a17] transition-colors placeholder:text-[#968c82] focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
              />
            </div>
          </div>

          {/* Sticky Actions Footer */}
          <div className="sticky bottom-0 bg-white dark:bg-[#1e1914] border-t border-[#ece4da] dark:border-[#33291f] p-4 sm:p-5 flex flex-col min-[360px]:flex-row items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full min-[360px]:flex-1 h-12 min-h-[48px] rounded-xl border border-[#ece4da] px-4 text-sm font-semibold text-[#6f675f] transition-colors hover:bg-[#fbf8f4] hover:text-[#1d1a17] dark:border-[#33291f] dark:text-[#a79c91] dark:hover:bg-[#28221b] dark:hover:text-[#f6efe8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-[360px]:flex-1 h-12 min-h-[48px] rounded-xl bg-[#f26a0f] px-5 text-sm font-semibold text-white transition-all hover:bg-[#e05e07] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f]"
            >
              {isSubmitting ? "Submitting..." : "Submit request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
