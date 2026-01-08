"use client";

import { useState, useEffect } from "react";
import Card from "@/components/emp/Card";
import Link from "next/link";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // UI uses "source", backend uses "leadOwner"
  const [sort, setSort] = useState({ key: "createdAt", dir: "desc" });

  const [loading, setLoading] = useState(false);

  /* --------------------------------------------------
     ✅ FIX: derive currentPage FIRST, then skip
  ---------------------------------------------------*/
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, maxPage);
  const skip = (currentPage - 1) * pageSize;

  /* --------------------------------------------------
     FETCH LEADS
  ---------------------------------------------------*/
  async function fetchLeads() {
    try {
      setLoading(true);

      // map UI "source" → backend "leadOwner"
      const backendSortKey =
        sort.key === "source" ? "leadOwner" : sort.key;

      const params = new URLSearchParams({
        q: q || "",
        take: String(pageSize),
        skip: String(skip),
        sortKey: backendSortKey,
        sortDir: sort.dir,
      });

      const res = await fetch(`/emp-api/leads?${params.toString()}`);
      const json = await res.json();

      if (!res.ok || !json.ok) {
        console.error(
          "API returned error while fetching leads:",
          json?.error || res.statusText
        );
        setLeads([]);
        setTotal(0);
        return;
      }

      // SOURCE shown from leadOwner (UI unchanged)
      const mappedLeads = (json.data || []).map((l) => ({
        ...l,
        source: l.leadOwner || "-",
        courseInterested: l.courses?.[0]?.courseInterested || "-",
      }));

      setLeads(mappedLeads);
      setTotal(
        typeof json.total === "number"
          ? json.total
          : mappedLeads.length
      );
    } catch (err) {
      console.error("Fetch leads error:", err);
      setLeads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  /* --------------------------------------------------
     EFFECTS
  ---------------------------------------------------*/
  useEffect(() => {
    fetchLeads();
  }, [q, page, pageSize, sort]);

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  function onChangePageSize(n) {
    setPageSize(n);
    setPage(1); // ✅ correct reset
  }

  useEffect(() => {
    function handleManualRefresh() {
      setSort({ key: "createdAt", dir: "desc" });
      setPage(1);
      setQ("");
    }

    window.addEventListener("refresh-leads", handleManualRefresh);
    return () =>
      window.removeEventListener("refresh-leads", handleManualRefresh);
  }, []);

  /* --------------------------------------------------
     UI
  ---------------------------------------------------*/
  return (
    <Card title="View Leads">
      {/* Search + Rows */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          placeholder="Search name, email, phone, course, source..."
          className="w-full sm:w-96 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rows:</label>
          <select
            value={pageSize}
            onChange={(e) => onChangePageSize(Number(e.target.value))}
            className="rounded-md border border-gray-300 px-2 py-2 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="text-center text-gray-500 py-3">
          Loading leads...
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              {[
                ["fullName", "Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["courseInterested", "Course"],
                ["source", "Source"],
                ["leadStatus", "Status"],
                ["createdAt", "Created"],
              ].map(([key, label]) => (
                <th
                  key={key}
                  className={`px-4 py-2 select-none ${
                    key === "courseInterested" ? "cursor-default text-gray-600" : "cursor-pointer"
                  }`}
                  onClick={key === "courseInterested" ? undefined : () => toggleSort(key)}
                >

                  <div className="inline-flex items-center gap-1">
                    {label}
                    {sort.key === key ? (
                      <span className="text-xs">
                        {sort.dir === "asc" ? "▲" : "▼"}
                      </span>
                    ) : (
                      <span className="text-xs text-transparent">▲</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 text-gray-600">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {leads.length === 0 && !loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              leads.map((r) => (
                <tr
                  key={r.leadId}
                  className="border-t border-gray-100 hover:bg-gray-50/60"
                >
                  <td className="px-4 py-3 font-medium">{r.fullName}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.phone || "-"}</td>
                  <td className="px-4 py-3">{r.courseInterested || "-"}</td>
                  <td className="px-4 py-3">{r.source}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        r.leadStatus === "New"
                          ? "bg-blue-100 text-blue-700"
                          : r.leadStatus === "Contacted"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {r.leadStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/myhome/leads/${r.leadId}`}
                      className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-gray-600">
          Showing <b>{total === 0 ? 0 : skip + 1}</b>–
          <b>{skip + leads.length}</b> of <b>{total}</b>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
            className="rounded-md border px-3 py-1 disabled:opacity-40"
          >
            « First
          </button>

          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-md border px-3 py-1 disabled:opacity-40"
          >
            ‹ Prev
          </button>

          <span className="px-2 py-1">
            Page <b>{currentPage}</b> / {maxPage}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={currentPage === maxPage}
            className="rounded-md border px-3 py-1 disabled:opacity-40"
          >
            Next ›
          </button>

          <button
            onClick={() => setPage(maxPage)}
            disabled={currentPage === maxPage}
            className="rounded-md border px-3 py-1 disabled:opacity-40"
          >
            Last »
          </button>
        </div>
      </div>
    </Card>
  );
}
