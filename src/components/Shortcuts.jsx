import React from "react";
import { Award, ShieldCheck, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SHORTCUT_ITEMS = [
  {
    id: "certificate",
    title: "Download a certificate",
    description: "Get approved permission letters as PDF for faculty verification.",
    icon: Award,
    href: "/certificates",
    actionText: "Download letters",
  },
  {
    id: "check-approved",
    title: "Check approved permissions",
    description: "See who is cleared for today's classes and department activities.",
    icon: ShieldCheck,
    href: "/permissions",
    actionText: "View attendance roster",
  },
  {
    id: "contact-hod",
    title: "Contact your HOD",
    description: "Find helpline numbers, department email, and faculty chamber contacts.",
    icon: Phone,
    href: "/helpline",
    actionText: "Helpline directory",
  },
];

export default function Shortcuts() {
  return (
    <section aria-labelledby="quick-shortcuts-heading" className="mt-8">
      <div className="mb-4">
        <h2
          id="quick-shortcuts-heading"
          className="font-heading text-xl font-bold tracking-tight text-[#1d1a17] dark:text-[#f6efe8] sm:text-2xl"
        >
          Quick shortcuts
        </h2>
        <p className="text-sm text-[#6f675f] dark:text-[#a79c91]">
          Frequently accessed student resources and college services
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHORTCUT_ITEMS.map(({ id, title, description, icon: Icon, href, actionText }) => (
          <Link
            key={id}
            to={href}
            className="group relative flex flex-col justify-between rounded-2xl border border-[#ece4da] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26a0f]/60 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f26a0f] dark:border-[#33291f] dark:bg-[#1e1914] dark:hover:border-[#f26a0f]/60"
            aria-label={`${title} - ${actionText}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff5eb] text-[#f26a0f] transition-transform duration-200 group-hover:scale-105 dark:bg-[#2d1d12]"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 stroke-[2.2]" />
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-[#8c8278] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f26a0f] dark:text-[#a79c91]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-4 font-heading text-base font-semibold text-[#1d1a17] dark:text-[#f6efe8]">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-[#6f675f] dark:text-[#a79c91]">
                {description}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#f26a0f]">
              <span>{actionText}</span>
              <span aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
