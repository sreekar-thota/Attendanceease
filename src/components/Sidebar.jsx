import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Bell,
  PlusCircle,
  Clock,
  Award,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react";

export default function Sidebar({ unreadNotificationsCount = 2, onNewRequest }) {
  const navigate = useNavigate();

  const NAV_ITEMS = [
    { label: "Home", to: "/", icon: Home },
    { label: "Notifications", to: "/notifications", icon: Bell, badge: unreadNotificationsCount },
    { label: "New request", isAction: true, icon: PlusCircle, onClick: onNewRequest },
    { label: "History", to: "/history", icon: Clock },
    { label: "Certificates", to: "/certificates", icon: Award },
    { label: "Profile", to: "/profile", icon: User },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of AttendEase?")) {
      alert("You have logged out.");
      navigate("/");
    }
  };

  return (
    <aside
      aria-label="Desktop sidebar"
      className="app-sidebar hidden flex-col justify-between border-r border-[#ece4da] bg-white p-5 dark:border-[#33291f] dark:bg-[#1e1914] transition-colors"
    >
      <div>
        {/* AttendEase Brand Header (Top Left Logo) */}
        <NavLink
          to="/"
          className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#f26a0f]"
        >
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-white p-1 shadow-xs ring-1 ring-[#ece4da] transition-transform group-hover:scale-105 dark:bg-[#2a231c] dark:ring-[#33291f]">
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

          <div>
            <span className="block font-heading text-lg font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8]">
              Attend<span className="text-[#f26a0f]">Ease</span>
            </span>
            <span className="block text-[11px] font-medium tracking-wide text-[#6f675f] dark:text-[#a79c91]">
              Permission Portal
            </span>
          </div>
        </NavLink>

        {/* Navigation Items */}
        <nav aria-label="Main menu" className="mt-7 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="flex w-full min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-[#1d1a17] transition-all hover:bg-[#fbf8f4] hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:text-[#f6efe8] dark:hover:bg-[#28221b] dark:hover:text-[#f26a0f]"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#6f675f] dark:text-[#a79c91]" aria-hidden="true" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-[#f26a0f] ${
                    isActive
                      ? "bg-[#fff5eb] text-[#f26a0f] font-semibold dark:bg-[#2d1d12] dark:text-[#f26a0f]"
                      : "text-[#1d1a17] hover:bg-[#fbf8f4] hover:text-[#f26a0f] dark:text-[#f6efe8] dark:hover:bg-[#28221b] dark:hover:text-[#f26a0f]"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className="grid h-5 w-5 place-items-center rounded-full bg-[#f26a0f] text-[11px] font-bold text-white shadow-xs"
                    aria-label={`${item.badge} unread notifications`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Logout & SRKR College Card */}
      <div className="space-y-4 pt-4">
        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full min-h-[44px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#6f675f] transition-colors hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-rose-500 dark:text-[#a79c91] dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
        >
          <LogOut className="h-5 w-5" aria-hidden="true" />
          <span>Logout</span>
        </button>

        {/* SRKR College Card with official emblem and GraduationCap */}
        <div className="rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-3 text-left transition-colors dark:border-[#33291f] dark:bg-[#14100d]">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white p-1 shadow-xs ring-1 ring-[#ece4da] dark:bg-[#1e1914] dark:ring-[#33291f]">
              <img
                src="/srkr-emblem.png"
                alt="SRKR Engineering College Emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-[#f26a0f] shrink-0" aria-hidden="true" />
                <span className="block truncate font-heading text-xs font-bold text-[#1d1a17] dark:text-[#f6efe8]">
                  CSD &amp; CSIT
                </span>
              </div>
              <span className="block truncate text-[11px] text-[#6f675f] dark:text-[#a79c91]">
                SRKR Engineering College
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
