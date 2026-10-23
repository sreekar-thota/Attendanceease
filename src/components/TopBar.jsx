import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, ShieldCheck, Sun, Moon, ChevronDown } from "lucide-react";

export default function TopBar({ student, isDarkMode, onToggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const nameParts = student.name.trim().split(" ");
  const initials = nameParts.length >= 2 
    ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    : student.name.slice(0, 2).toUpperCase();

  // Close menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle clicking outside or pressing Escape to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-20 w-full border-b border-[#ece4da] bg-white/90 backdrop-blur-md dark:border-[#33291f] dark:bg-[#1e1914]/90 transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Context */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-[#f26a0f]"
            aria-label="AttendEase Home"
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

          {/* Desktop Subtitle / Context (>= 900px) */}
          <div className="hidden min-[900px]:flex items-center gap-2 text-xs text-[#6f675f] dark:text-[#a79c91] border-l border-[#ece4da] dark:border-[#33291f] pl-3">
            <span className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">Student Portal</span>
            <span>/</span>
            <span>SRKR Engineering College</span>
          </div>
        </div>

        {/* Header Right Actions */}
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

          {/* Desktop Helpline Link (>= 640px) */}
          <Link
            to="/helpline"
            className="hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#ece4da] bg-white px-3.5 text-xs font-semibold text-[#1d1a17] transition-colors hover:border-[#f26a0f] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8] dark:hover:border-[#f26a0f]"
          >
            <Phone className="h-3.5 w-3.5 text-[#f26a0f]" aria-hidden="true" />
            <span>Helpline</span>
          </Link>

          {/* Desktop View Permissions Link (>= 640px) */}
          <Link
            to="/permissions"
            className="hidden sm:inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#ece4da] bg-white px-3.5 text-xs font-semibold text-[#1d1a17] transition-colors hover:border-[#f26a0f] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8] dark:hover:border-[#f26a0f]"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#f26a0f]" aria-hidden="true" />
            <span>View permissions</span>
          </Link>

          {/* Desktop Student Profile Button (>= 640px) */}
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

          {/* Mobile Profile & Actions Menu Trigger (< 640px) */}
          <div className="relative sm:hidden" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-haspopup="true"
              aria-label="Student profile and quick actions menu"
              className="flex items-center gap-1.5 min-h-[44px] rounded-xl border border-[#ece4da] bg-white px-2 py-1.5 text-[#1d1a17] transition-all hover:border-[#dfd4c5] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:text-[#f6efe8]"
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
              <ChevronDown
                className={`h-4 w-4 text-[#6f675f] dark:text-[#a79c91] transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-180 text-[#f26a0f]" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Mobile Dropdown Menu Popover */}
            {isMobileMenuOpen && (
              <div
                role="menu"
                aria-label="Mobile quick actions"
                className="absolute right-0 top-[calc(100%+8px)] w-[min(300px,calc(100vw-24px))] rounded-2xl border border-[#ece4da] bg-white p-2.5 shadow-2xl dark:border-[#33291f] dark:bg-[#1e1914] z-50"
              >
                {/* 1. Student Profile Header / Link */}
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#fbf9f6] dark:hover:bg-[#28221b] focus-visible:outline-2 focus-visible:outline-[#f26a0f]"
                  role="menuitem"
                >
                  {student.avatarUrl ? (
                    <img
                      src={student.avatarUrl}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-[#ece4da] dark:ring-[#33291f]"
                    />
                  ) : (
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f26a0f] text-sm font-bold text-white">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-heading text-xs font-bold text-[#1d1a17] dark:text-[#f6efe8] truncate">
                      {student.name}
                    </div>
                    <div className="text-[11px] text-[#6f675f] dark:text-[#a79c91]">
                      {student.roll} • {student.dept}
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#f26a0f]">Profile →</span>
                </Link>

                <div className="my-1.5 border-t border-[#ece4da] dark:border-[#33291f]" />

                {/* 2. View Permissions Action */}
                <Link
                  to="/permissions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#fbf9f6] dark:hover:bg-[#28221b] focus-visible:outline-2 focus-visible:outline-[#f26a0f]"
                  role="menuitem"
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#fff5eb] text-[#f26a0f] dark:bg-[#2d1d12]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                      View permissions
                    </div>
                    <div className="text-[11px] text-[#6f675f] dark:text-[#a79c91]">
                      Rules, approvals &amp; status
                    </div>
                  </div>
                </Link>

                {/* 3. Helpline Action */}
                <Link
                  to="/helpline"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#fbf9f6] dark:hover:bg-[#28221b] focus-visible:outline-2 focus-visible:outline-[#f26a0f]"
                  role="menuitem"
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#fff5eb] text-[#f26a0f] dark:bg-[#2d1d12]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                      Helpline &amp; Support
                    </div>
                    <div className="text-[11px] text-[#6f675f] dark:text-[#a79c91]">
                      +91 8816 223332 (CSD Office)
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
