import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

export default function NewRequestModal({ isOpen, onClose, onSubmitRequest }) {
  const [formData, setFormData] = useState({
    type: "Academic",
    subject: "",
    date: new Date().toISOString().split("T")[0],
    details: "",
  });
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.details.trim() || !formData.date) {
      setError("Please complete all required fields.");
      return;
    }

    // Format the date into e.g. "15 Oct" and Day "Thu"
    const parsedDate = new Date(formData.date);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedDate = `${String(parsedDate.getDate()).padStart(2, "0")} ${monthNames[parsedDate.getMonth()]}`;
    const dayOfWeek = dayNames[parsedDate.getDay()];

    const newRequest = {
      id: Date.now(),
      date: formattedDate,
      day: dayOfWeek,
      subject: formData.subject.trim(),
      details: formData.details.trim(),
      status: "Pending",
      ago: "Just now",
      type: formData.type,
    };

    onSubmitRequest(newRequest);
    onClose();
    // Reset form
    setFormData({
      type: "Academic",
      subject: "",
      date: new Date().toISOString().split("T")[0],
      details: "",
    });
    setError("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/65 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-[#ece4da] bg-white p-6 shadow-2xl transition-all sm:p-7 dark:border-[#33291f] dark:bg-[#1e1914]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#ece4da] pb-4 dark:border-[#33291f]">
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
                  className={`min-h-[44px] rounded-xl border text-xs font-semibold transition-all ${
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
              placeholder="e.g. Bluconn interview, Hackathon, Lab session"
              value={formData.subject}
              onChange={(e) => {
                setFormData({ ...formData, subject: e.target.value });
                setError("");
              }}
              className="mt-1.5 w-full min-h-[44px] rounded-xl border border-[#ece4da] bg-white px-3.5 text-sm text-[#1d1a17] transition-colors placeholder:text-[#968c82] focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
            />
          </div>

          {/* Date Picker */}
          <div>
            <label
              htmlFor="request-date"
              className="block text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]"
            >
              Permission date <span className="text-[#f26a0f]">*</span>
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
                className="w-full min-h-[44px] rounded-xl border border-[#ece4da] bg-white px-3.5 text-sm text-[#1d1a17] transition-colors focus-visible:border-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#f6efe8]"
              />
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

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] rounded-xl border border-[#ece4da] px-4 text-xs font-semibold text-[#6f675f] transition-colors hover:bg-[#fbf8f4] hover:text-[#1d1a17] dark:border-[#33291f] dark:text-[#a79c91] dark:hover:bg-[#28221b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] rounded-xl bg-[#f26a0f] px-5 text-xs font-semibold text-white transition-all hover:bg-[#e05e07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f]"
            >
              Submit request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
