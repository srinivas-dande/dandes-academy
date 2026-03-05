'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white to-gray-50 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center">

          {/* Logo (LEFT) */}
          <a
            href="/"
            className="flex items-center gap-2"
            aria-label="Dandes Academy"
          >
            <Image
              src="/images/DandesAcademy.jpg"
              alt="Dandes Academy"
              width={200}
              height={56}
              priority
              className="h-14 w-auto object-contain"
            />
          </a>

          <button
           onClick={() => setOpen(!open)}
            className="ml-auto md:hidden text-gray-700"
          >
            ☰
          </button>

          {/* Buttons (RIGHT) */}
          <div className="ml-auto hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">

            <Link href="/webinars" className="hover:text-[#AD1612] transition">
              Webinars
            </Link>

            <Link href="/free-class-videos" className="hover:text-[#AD1612] transition">
              Free Class Videos
            </Link>

            <a
              href="https://lms.dandesacademy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-[#AD1612] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#92100E] transition"
            >
              LMS Login <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

        </div>

        {open && (
          <div className="md:hidden py-4 space-y-4 text-gray-700 font-medium">
            <Link
              href="/webinars"
              className="block hover:text-[#AD1612]"
              onClick={() => setOpen(false)}
            >
              Webinars
            </Link>

            <Link
              href="/free-class-videos"
              className="block hover:text-[#AD1612]"
              onClick={() => setOpen(false)}
            >
              Free Class Videos
            </Link>

            <a
              href="https://lms.dandesacademy.com/"
              target="_blank"
              className="block hover:text-[#AD1612]"
              onClick={() => setOpen(false)}
            >
              LMS Login
            </a>
          </div>
        )}

      </div>
    </header>




  );
}
