"use client";
import Link from "next/link";

export default function WebinarHome() {
  return (
    <div className="flex flex-col gap-5 min-h-screen items-center justify-center bg-white p-4">
      <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center">
        Confused Between <span className="text-[#AD1612]">AI-Engineer or ML Engineer?</span>
      </h1>
      
      
      <Link 
        href="/webinars/how-to-become-an-ai-engineer-or-ml-engineer" 
        className="inline-flex items-center rounded-lg bg-[#AD1612] px-3 py-3 text-sm font-semibold text-white shadow hover:bg-[#92100E] transition"
      >
        Register Now 
      </Link>
    </div>
  );
}

