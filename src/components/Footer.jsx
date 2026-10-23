import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#ece4da] py-8 text-center text-xs text-[#6f675f] dark:border-[#33291f] dark:text-[#a79c91] transition-colors">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
        <div>
          <p className="font-medium text-[#1d1a17] dark:text-[#f6efe8]">
            &copy; 2026 AttendEase &middot; SRKR Engineering College, Bhimavaram.
          </p>
          <p className="mt-0.5 text-[11px] text-[#8c8278] dark:text-[#a79c91]">
            Department of Computer Science and Design (CSD) &amp; CSIT
          </p>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
          <Link
            to="/helpline"
            className="text-[#6f675f] transition-colors hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:text-[#a79c91] dark:hover:text-[#f26a0f]"
          >
            Helpline &amp; contacts
          </Link>
          <span className="text-[#ece4da] dark:text-[#33291f]" aria-hidden="true">&bull;</span>
          <a
            href="mailto:permissions@srkrec.edu.in?subject=AttendEase%20Feedback"
            className="text-[#6f675f] transition-colors hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:text-[#a79c91] dark:hover:text-[#f26a0f]"
          >
            Feedback &amp; reports
          </a>
        </nav>
      </div>
    </footer>
  );
}
