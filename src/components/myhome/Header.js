'use client';

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const json = await res.json();
        if (json.ok) {
          setUser(json.user);
        }
      } catch (err) {
        console.error("User load error:", err);
      }
    }
    loadUser();
  }, []);

  async function handleLogout() {
    const res = await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="/myhome" className="flex items-center gap-2">
          <Image
            src="/images/DandesAcademy.jpg"
            alt="Dandes Academy"
            width={180}
            height={50}
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* RIGHT SIDE — User Info + Logout */}
        <div className="flex items-center gap-6">

          {/* User Name + Role */}
          {user && (
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role}
              </p>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

      </div>
    </header>
  );
}
