import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Bell, Plus, Clock, User } from "lucide-react";

export default function BottomNav({ unreadAlertsCount = 2, onNewRequest }) {
  return (
    <nav
      aria-label="Mobile navigation"
      className="app-bottom-nav fixed bottom-0 left-0 right-0 z-40 w-full border-t border-[#ece4da] bg-white/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md dark:border-[#33291f] dark:bg-[#1e1914]/95 transition-colors"
    >
      <div className="relative mx-auto flex h-16 w-full max-w-md items-center justify-between px-2">
        {/* 1. Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex min-h-[44px] flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#f26a0f] ${
              isActive
                ? "font-semibold text-[#f26a0f]"
                : "text-[#6f675f] hover:text-[#1d1a17] dark:text-[#a79c91] dark:hover:text-[#f6efe8]"
            }`
          }
        >
          <Home className="h-5 w-5" aria-hidden="true" />
          <span className="mt-0.5">Home</span>
        </NavLink>

        {/* 2. Alerts (Notifications) */}
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `relative flex min-h-[44px] flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#f26a0f] ${
              isActive
                ? "font-semibold text-[#f26a0f]"
                : "text-[#6f675f] hover:text-[#1d1a17] dark:text-[#a79c91] dark:hover:text-[#f6efe8]"
            }`
          }
        >
          <div className="relative">
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadAlertsCount > 0 && (
              <span
                className="absolute -right-1.5 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#f26a0f] text-[9px] font-bold text-white shadow-xs"
                aria-label={`${unreadAlertsCount} unread alerts`}
              >
                {unreadAlertsCount}
              </span>
            )}
          </div>
          <span className="mt-0.5">Alerts</span>
        </NavLink>

        {/* 3. Center Raised Circular Orange "+" Button */}
        <div className="relative -top-4 flex shrink-0 flex-col items-center px-1">
          <button
            type="button"
            onClick={onNewRequest}
            aria-label="Create new attendance permission request"
            className="group flex h-13 w-13 items-center justify-center rounded-full bg-[#f26a0f] text-white shadow-lg ring-4 ring-[#fbf8f4] transition-all duration-200 hover:scale-105 hover:bg-[#e05e07] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f] dark:ring-[#14100d]"
          >
            <Plus className="h-6 w-6 transition-transform duration-200 group-hover:rotate-90 stroke-[2.5]" aria-hidden="true" />
          </button>
          <span className="mt-0.5 text-[10px] font-semibold text-[#f26a0f]">
            New
          </span>
        </div>

        {/* 4. History */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex min-h-[44px] flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#f26a0f] ${
              isActive
                ? "font-semibold text-[#f26a0f]"
                : "text-[#6f675f] hover:text-[#1d1a17] dark:text-[#a79c91] dark:hover:text-[#f6efe8]"
            }`
          }
        >
          <Clock className="h-5 w-5" aria-hidden="true" />
          <span className="mt-0.5">History</span>
        </NavLink>

        {/* 5. Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex min-h-[44px] flex-1 flex-col items-center justify-center py-1 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#f26a0f] ${
              isActive
                ? "font-semibold text-[#f26a0f]"
                : "text-[#6f675f] hover:text-[#1d1a17] dark:text-[#a79c91] dark:hover:text-[#f6efe8]"
            }`
          }
        >
          <User className="h-5 w-5" aria-hidden="true" />
          <span className="mt-0.5">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}
