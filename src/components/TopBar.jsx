import React from "react";
import { Link } from "react-router-dom";
import { Phone, ShieldCheck, Sun, Moon } from "lucide-react";

export default function TopBar({ student, isDarkMode, onToggleTheme }) {
  const nameParts = student.name.trim().split(" ");
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : student.name.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-20 w-full border-b border-[#ece4da] bg-white/90 backdrop-blur-md dark:border-[#33291f] dark:bg-[#1e1914]/90 transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Mobile Brand Logo (< 900px) */}
        <div className="mobile-brand-header items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-[#f26a0f]"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white p-0.5 shadow-xs ring-1 ring-[#ece4da] dark:bg-[#2a231c] dark:ring-[#33291f]">
              <img
                src="/attendease-logo.png"
                alt="AttendEase logo"
                className="h-full w-full object-contain block dark:hidden"
              />
              <img
                src="/attendease-logo-dark.png"
                alt="AttendEase logo"
                className="h-full w-full object-contain hidden dark:block"
              />
            </div>
            <span className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
              Attend<span className="text-[#f26a0f]">Ease</span>
            </span>
          </Link>
        </div>

        {/* Desktop Context Path (>= 900px) */}
        <div className="desktop-nav-header items-center gap-2 text-xs text-[#6f675f] dark:text-[#a79c91]">
          <span className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">Student Portal</span>
          <span>/</span>
          <span>SRKR Engineering College</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle (Light / Dark) */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl border border-[#ece4da] bg-white text-[#1d1a17] transition-colors hover:border-[#dfd4c5] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8] dark:hover:border-[#483a2d] dark:hover:text-[#f26a0f]"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-400" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-[#1d1a17]" aria-hidden="true" />
            )}
          </button>

          {/* Helpline Link */}
          <Link
            to="/helpline"
            className="hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#ece4da] bg-white px-3.5 text-xs font-semibold text-[#1d1a17] transition-colors hover:border-[#f26a0f] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8] dark:hover:border-[#f26a0f]"
          >
            <Phone className="h-3.5 w-3.5 text-[#f26a0f]" aria-hidden="true" />
            <span>Helpline</span>
          </Link>

          {/* View Permissions Link */}
          <Link
            to="/permissions"
            className="hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#ece4da] bg-white px-3.5 text-xs font-semibold text-[#1d1a17] transition-colors hover:border-[#f26a0f] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8] dark:hover:border-[#f26a0f]"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#f26a0f]" aria-hidden="true" />
            <span>View permissions</span>
          </Link>

          {/* Profile Button (shown on tablet & desktop) */}
          <Link
            to="/profile"
            className="hidden sm:flex min-h-[44px] items-center gap-2.5 rounded-xl border border-[#ece4da] bg-white py-1.5 pl-2 pr-3 transition-colors hover:border-[#dfd4c5] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:hover:border-[#483a2d]"
            aria-label={`View profile for ${student.name}`}
          >
            {student.avatarUrl ? (
              <img
                src={student.avatarUrl}
                alt=""
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-[#ece4da] dark:ring-[#33291f]"
              />
            ) : (
              <div
                className="grid h-7 w-7 place-items-center rounded-lg bg-[#f26a0f] text-xs font-bold text-white"
                aria-hidden="true"
              >
                {initials}
              </div>
            )}
            <span className="text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
              {student.name}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
