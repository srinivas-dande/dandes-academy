"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UpcomingBatches() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("da_batches");
      const list = raw ? JSON.parse(raw) : [];
      setBatches(list.sort((a, b) => (a.order ?? 1) - (b.order ?? 1)));
    } catch {
      setBatches([]);
    }
  }, []);

  if (!batches.length) return null;

  return (
    <section className="bg-[#F8FAFC] py-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Heading */}
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Invest in Your Career Today
        </h2>
        <div className="h-1 w-24 bg-[#FECACA] mx-auto mt-2 rounded-full" />

        {/* Batch Cards */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {batches.map((b) => (
            <BatchCard key={b.id} batch={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BatchCard({ batch }) {
  const isOpen = batch.status === "open";

  return (
    <div
      className="rounded-2xl bg-white p-6 shadow-sm flex flex-col items-center justify-center text-center h-56"
    >
      <div className="text-lg font-bold text-gray-800">{batch.title}</div>

      {batch.subtitle ? (
        <div className="text-sm text-gray-600 mt-1">{batch.subtitle}</div>
      ) : null}

      {batch.tag ? (
        <div className="mt-3 text-[11px] font-semibold tracking-wide text-[#AD1612] uppercase">
          {batch.tag}
        </div>
      ) : (
        <div className="mt-3 text-[11px] uppercase tracking-wide text-gray-400">
          {isOpen ? "ENROLLMENTS OPEN" : "ENROLLMENTS CLOSED"}
        </div>
      )}

      <div className="mt-4">
        {isOpen ? (
          <Link
            href={batch.ctaHref || "/"}
            className="inline-flex items-center justify-center rounded-lg bg-[#AD1612] px-5 py-2 text-sm font-semibold text-white hover:bg-[#92100E] transition"
          >
            {batch.ctaText || "Register Now"}
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 px-5 py-2 text-sm font-semibold cursor-not-allowed"
          >
            Closed
          </button>
        )}
      </div>
    </div>
  );
}
