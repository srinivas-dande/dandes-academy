'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-white to-gray-50 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="Dandes Academy">
            <Image
              src="/images/DandesAcademy.jpg"
              alt="Dandes Academy"
              width={200}
              height={56}
              priority
              className="h-14 w-auto object-contain"
            />
          </a>

         
        </div>
      </div>
    </header>
  );
}
