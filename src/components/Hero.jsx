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

  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-animate hero-card-theme relative w-full rounded-[24px] bg-[#241a12] p-5 text-[#fff4ea] shadow-sm transition-all sm:p-7 lg:p-9"
    >
      {/* Decorative background glow contained inside card bounds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]" aria-hidden="true">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#f26a0f]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-36 w-36 rounded-full bg-[#f26a0f]/10 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        {/* Left Column: Greeting, Student Identity */}
        <div className="w-full min-w-0 max-w-2xl">
          <h1
            id="hero-heading"
            className="font-heading text-[26px] leading-[1.25] font-bold tracking-tight text-[#fff4ea] sm:text-3xl lg:text-4xl"
            style={{ overflowWrap: "anywhere" }}
          >
            {getGreeting()}, {firstName}
          </h1>

          {/* Student Identity Card Area */}
          <div className="hero-student-card mt-4 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs sm:p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Photo */}
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={`${student.name}'s profile photo`}
                  className="h-[68px] w-[68px] min-[360px]:h-[76px] min-[360px]:w-[76px] sm:h-20 sm:w-20 shrink-0 rounded-2xl object-cover border border-white/20 shadow-xs"
                />
              ) : (
                <div
                  className="grid h-[68px] w-[68px] min-[360px]:h-[76px] min-[360px]:w-[76px] sm:h-20 sm:w-20 shrink-0 place-items-center rounded-2xl bg-[#f26a0f] text-xl font-bold text-white shadow-xs"
                  aria-hidden="true"
                >
                  {initials}
                </div>
              )}

              {/* Student Details (Name & Chips) */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <span
                  className="block font-heading text-[17px] sm:text-xl font-bold leading-tight text-[#fff4ea]"
                  style={{ overflowWrap: "anywhere" }}
                >
                  {student.name}
                </span>

                {/* Chips Row directly under name, beside photo */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[#e8cdb6] dark:text-[#f0d9c4] border border-white/5">
                    Roll no. <strong className="ml-1 font-bold text-white">{student.roll}</strong>
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[#e8cdb6] dark:text-[#f0d9c4] border border-white/5">
                    Dept. <strong className="ml-1 font-bold text-white">{student.dept}</strong>
                  </span>
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[#e8cdb6] dark:text-[#f0d9c4] border border-white/5">
                    Semester <strong className="ml-1 font-bold text-white">{student.sem}</strong>
                  </span>
                </div>
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
            Academic, medical or event permission.
          </span>
        </div>
      </div>
    </section>
  );
}
