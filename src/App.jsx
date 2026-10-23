import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import BottomNav from "./components/BottomNav";
import NewRequestModal from "./components/NewRequestModal";
import Home from "./pages/Home";
import {
  NotificationsView,
  HistoryView,
  CertificatesView,
  ProfileView,
  HelplineView,
  PermissionsView,
} from "./pages/PlaceholderPage";
import { DEFAULT_STUDENT, INITIAL_REQUESTS } from "./data/mock";

export default function App() {
  const [student, setStudent] = useState(DEFAULT_STUDENT);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize theme from document.documentElement class (set by index.html inline script)
  // or fallback to localStorage / prefers-color-scheme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  // Toggle dark mode on document.documentElement and persist to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        try {
          localStorage.setItem("theme", "dark");
        } catch {}
      } else {
        document.documentElement.classList.remove("dark");
        try {
          localStorage.setItem("theme", "light");
        } catch {}
      }
      return next;
    });
  };

  // Sync state if OS preference changes and no explicit choice was saved
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      try {
        const saved = localStorage.getItem("theme");
        if (!saved) {
          if (e.matches) {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
          } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
          }
        }
      } catch {}
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleOpenNewRequest = () => {
    setIsModalOpen(true);
  };

  const handleCloseNewRequest = () => {
    setIsModalOpen(false);
  };

  const handleAddRequest = (newRequest) => {
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleCancelRequest = (requestId) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)] transition-colors duration-200">
      {/* 1. Desktop Left Sidebar (>= 900px) */}
      <Sidebar
        unreadNotificationsCount={2}
        onNewRequest={handleOpenNewRequest}
      />

      {/* 2. Main Content Area (Offset by sidebar on desktop) */}
      <div className="app-content-wrapper flex min-h-screen flex-col">
        {/* Sticky TopBar */}
        <TopBar
          student={student}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />

        {/* Dynamic Route Content */}
        <main
          id="main-content"
          className="flex-1 px-4 py-6 sm:px-6 sm:py-8 min-[900px]:px-8 min-[900px]:pb-12"
          style={{ paddingBottom: "calc(104px + env(safe-area-inset-bottom, 0px))" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  student={student}
                  requests={requests}
                  onNewRequest={handleOpenNewRequest}
                  onCancelRequest={handleCancelRequest}
                />
              }
            />
            <Route path="/notifications" element={<NotificationsView />} />
            <Route path="/history" element={<HistoryView requests={requests} />} />
            <Route path="/certificates" element={<CertificatesView />} />
            <Route path="/profile" element={<ProfileView student={student} />} />
            <Route path="/helpline" element={<HelplineView />} />
            <Route path="/permissions" element={<PermissionsView />} />
          </Routes>
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation (< 900px) */}
      <BottomNav
        unreadAlertsCount={2}
        onNewRequest={handleOpenNewRequest}
      />

      {/* 4. New Permission Request Dialog Modal */}
      <NewRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseNewRequest}
        onSubmitRequest={handleAddRequest}
      />
    </div>
  );
}
