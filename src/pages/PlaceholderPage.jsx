import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Bell, Award, User, Phone, ShieldCheck } from "lucide-react";

export default function PlaceholderPage({
  title,
  subtitle,
  icon: Icon,
  badge,
  children,
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Back button */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl text-xs font-semibold text-[#6f675f] transition-colors hover:text-[#f26a0f] focus-visible:outline-2 focus-visible:outline-[#f26a0f] dark:text-[#a79c91] dark:hover:text-[#f26a0f]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="rounded-3xl border border-[#ece4da] bg-white p-6 shadow-xs sm:p-8 dark:border-[#33291f] dark:bg-[#1e1914] transition-colors">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fff5eb] text-[#f26a0f] dark:bg-[#2d1d12]">
              <Icon className="h-6 w-6 stroke-[2.2]" />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8] sm:text-3xl">
                {title}
              </h1>
              {badge && (
                <span className="rounded-full bg-[#f26a0f] px-2.5 py-0.5 text-xs font-bold text-white">
                  {badge}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[#6f675f] dark:text-[#a79c91]">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-[#ece4da] pt-6 dark:border-[#33291f]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function NotificationsView() {
  return (
    <PlaceholderPage
      title="Notifications & Alerts"
      subtitle="System updates, approval alerts, and department notices"
      icon={Bell}
      badge="2 new"
    >
      <div className="space-y-3">
        <div className="flex items-start gap-3 rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 dark:border-[#33291f] dark:bg-[#14100d]">
          <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
          <div>
            <h2 className="text-sm font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
              Internship permission approved
            </h2>
            <p className="mt-0.5 text-xs text-[#6f675f] dark:text-[#a79c91]">
              Your permission request for "Bluconn interview" on 09 Oct was approved by HOD, CSD &amp; CSIT.
            </p>
            <span className="mt-2 block text-[11px] text-[#8c8278] dark:text-[#a79c91]">14 days ago</span>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 dark:border-[#33291f] dark:bg-[#14100d]">
          <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
          <div>
            <h2 className="text-sm font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
              Attendance submission reminder
            </h2>
            <p className="mt-0.5 text-xs text-[#6f675f] dark:text-[#a79c91]">
              Ensure all lab and seminar permissions are filed 24 hours prior to the session.
            </p>
            <span className="mt-2 block text-[11px] text-[#8c8278] dark:text-[#a79c91]">Yesterday</span>
          </div>
        </div>
      </div>
    </PlaceholderPage>
  );
}

export function HistoryView({ requests }) {
  return (
    <PlaceholderPage
      title="Permission History"
      subtitle="Complete chronological archive of all attendance applications"
      icon={Clock}
    >
      <div className="overflow-hidden rounded-2xl border border-[#ece4da] bg-white dark:border-[#33291f] dark:bg-[#1e1914]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#ece4da] bg-[#fbf8f4] text-[#6f675f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#a79c91]">
            <tr>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Subject</th>
              <th className="p-3.5">Details</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ece4da] dark:divide-[#33291f]">
            {requests.map((r) => (
              <tr key={r.id}>
                <td className="p-3.5 font-medium">{r.date} ({r.day})</td>
                <td className="p-3.5 font-semibold text-[#1d1a17] dark:text-[#f6efe8]">{r.subject}</td>
                <td className="p-3.5 text-[#6f675f] dark:text-[#a79c91]">{r.details}</td>
                <td className="p-3.5 font-semibold">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PlaceholderPage>
  );
}

export function CertificatesView() {
  return (
    <PlaceholderPage
      title="Certificates &amp; Slips"
      subtitle="Download certified PDF attendance clearance letters signed by SRKR faculty"
      icon={Award}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-2xl border border-[#ece4da] p-4 dark:border-[#33291f]">
          <div>
            <h2 className="text-sm font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
              Bluconn Interview Attendance Letter
            </h2>
            <p className="text-xs text-[#6f675f] dark:text-[#a79c91]">
              Approved for 09 Oct &middot; Digital signature verified
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Downloading Bluconn interview clearance certificate PDF.")}
            className="rounded-xl border border-[#ece4da] px-3.5 py-2 text-xs font-semibold hover:border-[#f26a0f] hover:text-[#f26a0f] dark:border-[#33291f] dark:text-[#f6efe8]"
          >
            Download PDF
          </button>
        </div>
      </div>
    </PlaceholderPage>
  );
}

export function ProfileView({ student }) {
  return (
    <PlaceholderPage
      title="Student Profile"
      subtitle="Official student academic identity records"
      icon={User}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center mb-6 p-4 rounded-2xl border border-[#ece4da] bg-[#fbf8f4] dark:border-[#33291f] dark:bg-[#14100d]">
        <img
          src={student.avatarUrl || "/student-avatar.png"}
          alt={student.name}
          className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#f26a0f]"
        />
        <div>
          <h2 className="font-heading text-xl font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            {student.name}
          </h2>
          <p className="text-sm text-[#6f675f] dark:text-[#a79c91]">
            {student.departmentFull} &middot; {student.college}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 dark:border-[#33291f] dark:bg-[#14100d]">
          <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Full Name</span>
          <p className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            {student.name}
          </p>
        </div>
        <div className="rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 dark:border-[#33291f] dark:bg-[#14100d]">
          <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Roll Number</span>
          <p className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            {student.roll}
          </p>
        </div>
        <div className="rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 dark:border-[#33291f] dark:bg-[#14100d]">
          <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Department</span>
          <p className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            {student.dept} (Computer Science and Design)
          </p>
        </div>
        <div className="rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 dark:border-[#33291f] dark:bg-[#14100d]">
          <span className="text-xs text-[#6f675f] dark:text-[#a79c91]">Current Semester</span>
          <p className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            Semester {student.sem}
          </p>
        </div>
      </div>
    </PlaceholderPage>
  );
}

export function HelplineView() {
  return (
    <PlaceholderPage
      title="Helpline &amp; Faculty Contacts"
      subtitle="SRKR Engineering College CSD &amp; CSIT Department Office"
      icon={Phone}
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-[#ece4da] p-4 dark:border-[#33291f]">
          <h2 className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            Head of Department (HOD)
          </h2>
          <p className="text-xs text-[#6f675f] dark:text-[#a79c91]">
            Dr. K. Suresh Babu &middot; CSD &amp; CSIT Block, Room 204
          </p>
          <p className="mt-2 text-xs font-semibold text-[#f26a0f]">
            Email: hod_csd@srkrec.edu.in
          </p>
        </div>

        <div className="rounded-2xl border border-[#ece4da] p-4 dark:border-[#33291f]">
          <h2 className="font-heading text-base font-bold text-[#1d1a17] dark:text-[#f6efe8]">
            Attendance Office Helpline
          </h2>
          <p className="text-xs text-[#6f675f] dark:text-[#a79c91]">
            Phone: +91 8816 223332 (Ext. 244) &middot; Monday to Saturday 9:00 AM - 5:00 PM
          </p>
        </div>
      </div>
    </PlaceholderPage>
  );
}

export function PermissionsView() {
  return (
    <PlaceholderPage
      title="Approved Permissions Roster"
      subtitle="Active permission list cleared for faculty attendance register reconciliation"
      icon={ShieldCheck}
    >
      <div className="rounded-2xl border border-[#ece4da] bg-[#fbf8f4] p-4 text-xs text-[#6f675f] dark:border-[#33291f] dark:bg-[#14100d] dark:text-[#a79c91]">
        <p className="font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
          Official cleared status for today's sessions:
        </p>
        <p className="mt-1">
          Students with approved permissions do not incur attendance penalty for accredited internships, university tournaments, or approved medical leaves.
        </p>
      </div>
    </PlaceholderPage>
  );
}
