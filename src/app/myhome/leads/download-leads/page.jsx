"use client";

import { useState, useEffect } from "react";

export default function DownloadLeadsPage() {
  const [filters, setFilters] = useState({
    courseInterested: "",
    leadOwner: "",
    leadStatus: "",
    from: "",
    to: "",
  });

  const [dropdowns, setDropdowns] = useState({
    courses: [],
    sources: [],
    statuses: [],
  });

  const [leads, setLeads] = useState([]);
  const [searched, setSearched] = useState(false);

  /* --------------------------------------------------
     LOAD FILTER DROPDOWNS
  ---------------------------------------------------*/
  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await fetch("/emp-api/download-leads/filters");
        const data = await res.json();

        setDropdowns({
          courses: data.courses || [],
          sources: data.sources || [],
          statuses: data.statuses || [],
        });
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    }
    loadFilters();
  }, []);

  /* --------------------------------------------------
     SEARCH
  ---------------------------------------------------*/
  async function handleSearch() {
    setSearched(true);
    const query = new URLSearchParams(filters).toString();

    const res = await fetch(`/emp-api/download-leads?${query}`);
    const data = await res.json();
    setLeads(data.leads || []);
  }

  /* --------------------------------------------------
     DOWNLOAD CSV
  ---------------------------------------------------*/
  function downloadCSV() {
    if (leads.length === 0) return;

    const header = Object.keys(leads[0]).join(",") + "\n";
    const rows = leads.map((lead) => Object.values(lead).join(",")).join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Download Leads</h1>

      <div className="w-full flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-3/4 md:w-3/5 lg:w-1/2">

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Course */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Course Interested
              </label>
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={filters.courseInterested}
                onChange={(e) =>
                  setFilters({ ...filters, courseInterested: e.target.value })
                }
              >
                <option value="">Select Course</option>
                {dropdowns.courses.map((item, i) => {
                  const value = typeof item === "string" ? item : item.courseInterested;
                  return (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Source
              </label>
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={filters.leadOwner}
                onChange={(e) =>
                  setFilters({ ...filters, leadOwner: e.target.value })
                }
              >
                <option value="">Select Source</option>
                {dropdowns.sources.map((item, i) => {
                  const value = typeof item === "string" ? item : item.source;
                  return (
                    <option key={i} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Lead Status */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Lead Status
            </label>
            <select
              className="border border-gray-300 p-2 rounded w-full"
              value={filters.leadStatus}
              onChange={(e) =>
                setFilters({ ...filters, leadStatus: e.target.value })
              }
            >
              <option value="">Select Status</option>
              {dropdowns.statuses.map((item, i) => {
                const value =
                  typeof item === "string" ? item : item.leadStatus;
                return (
                  <option key={i} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Date Range */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Date Range
            </label>

            <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">From</label>
                  <input
                    type="date"
                    className="border border-gray-300 p-2 rounded w-full"
                    value={filters.from}
                    onChange={(e) =>
                      setFilters({ ...filters, from: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600">To</label>
                  <input
                    type="date"
                    className="border border-gray-300 p-2 rounded w-full"
                    value={filters.to}
                    onChange={(e) =>
                      setFilters({ ...filters, to: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-[#AD1612] text-white mt-6 px-4 py-2 rounded w-full"
          >
            Search
          </button>
        </div>
      </div>

      {searched && (
        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-3">
            Found <strong>{leads.length}</strong> leads
          </p>

          {leads.length > 0 && (
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-5 py-2 rounded-lg"
            >
              Download CSV
            </button>
          )}
        </div>
      )}
    </div>
  );
}
