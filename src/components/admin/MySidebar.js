"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MySidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => setMounted(true), []);

  const menus = [
    {
      key: "leads",
      title: "Leads",
      items: [
        { label: "View Leads", href: "/myhome/leads" },
        { label: "Add Lead", href: "/myhome/leads/add-lead" },
        { label: "Download Leads", href: "/myhome/leads/download-leads" },
        { label: "Upload Leads", href: "/myhome/leads/upload-leads" },
      ],
    },
    {
      key: "enrollments",
      title: "Enrollments",
      items: [
        { label: "View Enrollments", href: "/myhome/enrollments" },
        { label: "New Enrollment", href: "/myhome/enrollments/enrollment-form" },
      ],
    },
    {
      key: "admin",
      title: "Admin Tasks",
      items: [
        { label: "Add Webinar Timer", href: "/myhome/admin/webinar-timer" },
        { label: "Upload New Syllabus", href: "/myhome/admin/upload-syllabus" },
      ],
    },
  ];

  function toggleSection(key) {
    setOpenSection((prev) => (prev === key ? null : key));
  }

  if (!mounted) {
    return (
      <aside className="w-64 p-4 bg-white border-r min-h-screen">
        <div className="text-gray-400 text-sm">Loading menu…</div>
      </aside>
    );
  }

  return (
    <aside className="w-64 p-5 bg-white border-r min-h-screen">
      
      {/* =================== HOME BUTTON =================== */}
      <button
        onClick={() => router.push("/myhome")}
        className={
          pathname === "/myhome"
            ? "w-full text-left px-3 py-2 rounded-md text-lg font-bold bg-[#AD1612] text-white shadow mb-6"
            : "w-full text-left px-3 py-2 rounded-md text-lg font-bold text-gray-800 hover:bg-[#FEE2E2] hover:text-[#AD1612] mb-6"
        }
      >
        Dashboard
      </button>

      {/* =================== MENU SECTIONS =================== */}
      <div className="flex flex-col space-y-6">
        {menus.map((section) => (
          <div key={section.key}>
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full text-left px-3 py-2 rounded-md font-semibold text-gray-900 hover:bg-gray-100"
            >
              {section.title}
            </button>

            {openSection === section.key && (
              <div className="flex flex-col ml-4 mt-2 space-y-1">
                {section.items.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <button
                      key={item.href}
                      onClick={() => router.push(item.href)}
                      className={
                        active
                          ? "w-full text-left px-3 py-2 rounded-md text-sm bg-[#AD1612] text-white font-semibold shadow"
                          : "w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-[#FEE2E2] hover:text-[#AD1612]"
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
