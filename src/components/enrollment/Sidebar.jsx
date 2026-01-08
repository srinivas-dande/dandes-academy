"use client";

import { useRouter, usePathname } from "next/navigation";

const links = [
  { href: "/enrollment-home", label: "Dashboard" },
  { href: "/enrollment-home/enrollment-form", label: "Enrollment Form" },
  { href: "/enrollment-home/enrollments", label: "View Enrollments" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-full flex flex-col space-y-2">
      {links.map((item) => {
        const active = pathname === item.href;

        return (
          <button
            key={item.href}
            onClick={() => {
              if (pathname === item.href) {
                // Refresh only list page
                if (item.href === "/enrollment/enrollments") {
                  window.dispatchEvent(new Event("refresh-enrollments"));
                }
              } else {
                router.push(item.href);
              }
            }}
            className={`w-full text-left px-4 py-2 rounded-md text-sm font-semibold transition ${
              active
                ? "bg-[#AD1612] text-white shadow-md"
                : "text-gray-700 hover:bg-[#FEE2E2] hover:text-[#AD1612]"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </aside>
  );
}
