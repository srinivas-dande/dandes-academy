"use client";

import { useRouter, usePathname } from "next/navigation";

const links = [
  { href: "/emp-home", label: "Home" },
  { href: "/emp-home/add-lead", label: "Add New Lead" },
  { href: "/emp-home/leads", label: "View Leads" },
  { href: "/emp-home/webinar-timer", label: "Add Webinar Timer" },
  { href: "/emp-home/upload-syllabus", label: "Upload New Syllabus" },
  { href: "/emp-home/download-leads", label: "Download Leads" },
  { href: "/emp-home/upload-leads", label: "Upload Leads" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-3">
      {links.map((item) => {
        const active = pathname === item.href;

        return (
          <button
            key={item.href}
            onClick={() => {
              if (pathname === item.href) {
                // refresh-leads event only for leads page
                window.dispatchEvent(new Event("refresh-leads"));
              } else {
                router.push(item.href);
              }
            }}
            className={`text-left block rounded-md px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-[#AD1612] text-white shadow-sm"
                : "text-gray-700 hover:bg-[#FEE2E2] hover:text-[#AD1612]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
