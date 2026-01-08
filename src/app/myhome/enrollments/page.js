"use client";

import { useEffect, useState } from "react";
import Card from "@/components/enrollment/Card";
import Link from "next/link";

const PAGE_SIZE_OPTIONS = [5, 10, 20];

export default function ViewEnrollmentsPage() {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [q, setQ] = useState("");
  const [sort, setSort] = useState({ key: "createdAt", dir: "desc" });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [loading, setLoading] = useState(true);

  /* Fetch from API */
  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/enrollment-api/enrollments");
      const data = await res.json();
      setList(data?.data || []);
    } catch (err) {
      console.error("Load error:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    window.addEventListener("refresh-enrollments", load);
    return () => window.removeEventListener("refresh-enrollments", load);
  }, []);

  /* Search + Sort + Pagination */
  useEffect(() => {
    let rows = [...list];

    // 🔍 Search only by PHONE NUMBER
    if (q.trim()) {
      const t = q.toLowerCase();
      rows = rows.filter((r) =>
        (r.phone || "").toLowerCase().includes(t)
      );
    }

    // 🔽 Sorting
    rows.sort((a, b) => {
      const A = a[sort.key];
      const B = b[sort.key];

      if (A == null && B == null) return 0;
      if (A == null) return sort.dir === "asc" ? -1 : 1;
      if (B == null) return sort.dir === "asc" ? 1 : -1;

      if (sort.key === "createdAt") {
        const da = new Date(A).getTime();
        const db = new Date(B).getTime();
        return sort.dir === "asc" ? da - db : db - da;
      }

      if (A > B) return sort.dir === "asc" ? 1 : -1;
      if (A < B) return sort.dir === "asc" ? -1 : 1;
      return 0;
    });

    setFiltered(rows);
    setPage(1);
  }, [q, sort, list]);

  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  }

  return (
    <Card title="View Enrollments">

      {/* 🔍 SEARCH ONLY BY PHONE */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by phone number..."
          className="w-full sm:w-96 rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#AD1612]/30"
        />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Rows:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="rounded-md border border-gray-300 px-2 py-2 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-3">Loading enrollments...</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-500 text-sm">No enrollments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 bg-gray-50">
                {[
                  ["studentId", "Student ID"],
                  ["fullName", "Name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["courseJoined", "Course"],
                  ["status", "Status"],
                  ["createdAt", "Created"],
                  ["action", "Action"],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => key !== "action" && toggleSort(key)}
                    className={`px-4 py-2 ${key !== "action" ? "cursor-pointer select-none" : ""}`}
                  >
                    <div className="inline-flex items-center gap-1">
                      {label}
                      {sort.key === key ? (
                        <span className="text-xs">{sort.dir === "asc" ? "▲" : "▼"}</span>
                      ) : (
                        <span className="text-xs text-transparent">▲</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white">
              {paginated.map((r) => (
                <tr key={r.studentId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{r.studentId}</td>
                  <td className="px-4 py-3 font-medium">{r.fullName}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3">{r.courseJoined}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        r.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/myhome/enrollments/${r.studentId}`}
                      className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-gray-600">
            Showing <b>{start + 1}</b> – <b>{start + paginated.length}</b> of <b>{filtered.length}</b>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setPage(1)} disabled={page === 1} className="border px-3 py-1 rounded-md disabled:opacity-40">
              « First
            </button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="border px-3 py-1 rounded-md disabled:opacity-40">
              ‹ Prev
            </button>
            <span className="px-2 py-1">
              Page <b>{page}</b> / {maxPage}
            </span>
            <button onClick={() => setPage((p) => Math.min(maxPage, p + 1))} disabled={page === maxPage} className="border px-3 py-1 rounded-md disabled:opacity-40">
              Next ›
            </button>
            <button onClick={() => setPage(maxPage)} disabled={page === maxPage} className="border px-3 py-1 rounded-md disabled:opacity-40">
              Last »
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
