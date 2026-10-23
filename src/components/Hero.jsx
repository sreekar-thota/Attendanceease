import React from "react";
import { Plus } from "lucide-react";

export default function Hero({ student, approvedCount, pendingCount, onNewRequest }) {
  // Derive time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Student name: "Thota Devi Sri Sai Sreekar" -> first call name "Sreekar"
  const nameParts = student.name.trim().split(" ");
  const firstName = nameParts[nameParts.length - 1] || "Student";
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : student.name.slice(0, 2).toUpperCase();

  // Dynamic summary sentence
  const getSummaryText = () => {
    if (approvedCount === 0 && pendingCount === 0) {
      return "No active requests. Ready to apply when you need permission.";
    }
    const approvedPart = approvedCount === 1 ? "1 approved" : `${approvedCount} approved`;
    const pendingPart = pendingCount === 1 ? "1 waiting for review" : `${pendingCount} waiting for review`;

    if (approvedCount > 0 && pendingCount > 0) {
      return `${approvedPart}, ${pendingPart}.`;
    }
    if (approvedCount > 0) {
      return `${approvedPart}, 0 waiting for review.`;
    }
    return `0 approved, ${pendingPart}.`;
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-animate hero-card-theme relative w-full overflow-hidden rounded-[24px] bg-[#241a12] p-5 text-[#fff4ea] shadow-sm transition-all sm:p-7 lg:p-9"
    >
      {/* Decorative background glow contained inside card bounds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]" aria-hidden="true">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#f26a0f]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-36 w-36 rounded-full bg-[#f26a0f]/10 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        {/* Left Column: Greeting, Summary, Student Identity */}
        <div className="w-full min-w-0 max-w-2xl">
          <h1
            id="hero-heading"
            className="font-heading text-2xl font-bold tracking-tight text-[#fff4ea] sm:text-3xl lg:text-4xl"
          >
            {getGreeting()}, {firstName}
          </h1>

          <p className="mt-1 text-sm text-[#e8cdb6] dark:text-[#f0d9c4] sm:text-base">
            {getSummaryText()}
          </p>

          {/* Student Identity Card Area */}
          <div className="hero-student-card mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs sm:flex-row sm:items-center sm:gap-4 sm:p-4">
            <div className="flex items-center gap-3">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={`${student.name}'s profile photo`}
                  className="h-12 w-12 shrink-0 rounded-xl border border-white/20 object-cover shadow-xs sm:h-14 sm:w-14"
                />
              ) : (
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#f26a0f] text-base font-bold text-white shadow-xs sm:h-14 sm:w-14 sm:text-lg"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}

              {/* On mobile: name is next to avatar */}
              <div className="min-w-0 flex-1 sm:hidden">
                <span className="block truncate font-heading text-base font-semibold text-[#fff4ea]">
                  {student.name}
                </span>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              {/* On tablet/desktop: name is above chips */}
              <span className="hidden truncate font-heading text-base font-semibold text-[#fff4ea] sm:block sm:text-lg">
                {student.name}
              </span>

              {/* Identity Chips */}
              <div className="flex flex-wrap gap-1.5 sm:mt-1.5 sm:gap-2 text-[11px] sm:text-xs">
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[#e8cdb6] dark:text-[#f0d9c4]">
                  Roll no. <strong className="ml-1 text-white">{student.roll}</strong>
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[#e8cdb6] dark:text-[#f0d9c4]">
                  Dept. <strong className="ml-1 text-white">{student.dept}</strong>
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[#e8cdb6] dark:text-[#f0d9c4]">
                  Semester <strong className="ml-1 text-white">{student.sem}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Primary CTA Button (Sole filled button on page) */}
        <div className="flex shrink-0 flex-col items-stretch md:items-end">
          <button
            type="button"
            onClick={onNewRequest}
            className="group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-[#f26a0f] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#e05e07] hover:shadow active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f]"
          >
            <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" aria-hidden="true" />
            <span>New request</span>
          </button>
          <span className="mt-2 text-center text-xs text-[#e8cdb6] dark:text-[#f0d9c4] md:text-right">
            Academic, medical or event permission
          </span>
        </div>
      </div>
    </section>
  );
}
