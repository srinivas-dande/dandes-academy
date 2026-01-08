"use client";
import Image from "next/image";

export default function LoginHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Row → FIX: use justify-start */}
        <div className="flex h-20 items-center justify-start">
          
          <a href="/" className="flex items-center gap-2" aria-label="Dandes Academy">
            <Image
              src="/images/DandesAcademy.jpg"
              alt="Dandes Academy"
              width={180}
              height={50}
              priority
              className="h-12 w-auto object-contain"
            />
          </a>

        </div>
      </div>
    </header>
  );
}
