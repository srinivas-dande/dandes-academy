"use client";

import { useEffect, useMemo, useState } from "react";

const BTN =
  "inline-flex items-center justify-center rounded-lg bg-[#AD1612] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#92100E] transition disabled:opacity-50";
const BTN_OUTLINE =
  "inline-flex items-center justify-center rounded-lg border border-[#AD1612] px-4 py-2 text-sm font-semibold text-[#AD1612] hover:bg-red-50 transition";

function useCountdown(targetIso) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  return useMemo(() => {
    if (!targetIso) return { done: false, d: 0, h: 0, m: 0, s: 0 };
    const target = new Date(targetIso).getTime();
    const diff = Math.max(0, target - now);
    const done = diff === 0;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);
    return { done, d, h, m, s };
  }, [targetIso, now]);
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

export default function WebinarTimerPage() {
  const [title, setTitle] = useState("");
  const [dateTimeLocal, setDateTimeLocal] = useState("");
  const [desc, setDesc] = useState("");
  const [msg, setMsg] = useState(null);
  const [webinars, setWebinars] = useState([]);

  // ✅ Fetch only the latest webinar
  async function fetchWebinars() {
    try {
      const res = await fetch("/emp-api/webinars/latest");
      const data = await res.json();
      if (data.ok) setWebinars(data.data?.slice(0, 1) || []);
    } catch (err) {
      console.error("Error fetching webinars:", err);
    }
  }

  useEffect(() => {
    fetchWebinars();
  }, []);

  const isoTarget = useMemo(() => {
    if (!dateTimeLocal) return "";
    const local = new Date(dateTimeLocal);
    return local.toISOString();
  }, [dateTimeLocal]);

  const { done, d, h, m, s } = useCountdown(isoTarget);

  async function handleSave(e) {
    e.preventDefault();
    setMsg(null);

    if (!title.trim()) {
      setMsg({ type: "error", text: "Title is required." });
      return;
    }
    if (!isoTarget) {
      setMsg({ type: "error", text: "Date & Time is required." });
      return;
    }

    try {
      const res = await fetch("/emp-api/add-webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          dateTime: isoTarget,
          description: desc.trim() || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add webinar");

      setMsg({ type: "ok", text: "Webinar added successfully!" });
      setTitle("");
      setDateTimeLocal("");
      setDesc("");
      fetchWebinars();

      setTimeout(() => setMsg(null), 3000);
    } catch (err) {
      console.error("Error submitting webinar:", err);
      setMsg({ type: "error", text: err.message });
    }
  }

  return (
    <div className="rounded-2xl bg-white shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Add Webinar Timer
        </h2>
        {msg?.type === "ok" && (
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-1">
            {msg.text}
          </span>
        )}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSave}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* LEFT SIDE FORM */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., AI/ML Course Demo Webinar"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={dateTimeLocal}
              onChange={(e) => setDateTimeLocal(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className={BTN}>Save</button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDateTimeLocal("");
                setDesc("");
                setMsg(null);
              }}
              className={BTN_OUTLINE}
            >
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — LIVE + MANAGEMENT PREVIEW */}
        <div className="space-y-6">
          <div className="bg-white border rounded-2xl p-5">
            <div className="text-sm text-gray-600 mb-2">Live Preview</div>
            <div className="text-base font-semibold mb-3">
              {title || "Webinar Title"}
            </div>
            <CountdownView d={d} h={h} m={m} s={s} done={done} />
            {desc && <p className="mt-3 text-sm text-gray-600">{desc}</p>}
            {isoTarget && (
              <p className="mt-3 text-xs text-gray-500">Target (ISO): {isoTarget}</p>
            )}
          </div>

          {/* Webinar Management Preview (Latest 1) */}
          <div className="bg-white border rounded-2xl p-5">
            <div className="text-sm text-gray-600 mb-2">
              Webinar Management Preview (Latest 1)
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-left text-gray-600">
                  <tr>
                    <th className="px-3 py-2">Title</th>
                    <th className="px-3 py-2">Date & Time</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {webinars.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500 italic">
                        No webinars found.
                      </td>
                    </tr>
                  ) : (
                    webinars.map((w) => (
                      <tr key={w.webinarId} className="border-t">
                        <td className="px-3 py-2 font-medium">{w.title}</td>
                        <td className="px-3 py-2">{formatDateTime(w.dateTime)}</td>
                        <td
                          className={`px-3 py-2 font-semibold ${
                            w.status === "Running" ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {w.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function CountdownView({ d, h, m, s, done }) {
  return (
    <div className="inline-flex gap-4 items-center rounded-2xl bg-white">
      <TimeBox label="Days" value={d} />
      <Divider />
      <TimeBox label="Hours" value={h} />
      <Divider />
      <TimeBox label="Minutes" value={m} />
      <Divider />
      <TimeBox label="Seconds" value={s} />
      {done && <span className="ml-3 text-sm text-emerald-700 font-medium">Webinar started!</span>}
    </div>
  );
}

function Divider() {
  return <span className="text-gray-300">:</span>;
}

function TimeBox({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-extrabold tabular-nums">{pad2(value)}</div>
      <div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div>
    </div>
  );
}

function formatDateTime(dateTime) {
  const d = new Date(dateTime);

  const day = d.getDate();
  const month = d.toLocaleString("en-IN", { month: "short" });
  const year = d.getFullYear();
  const weekday = d.toLocaleString("en-IN", { weekday: "long" });

  const suffix =
    day % 10 === 1 && day !== 11 ? "st" :
    day % 10 === 2 && day !== 12 ? "nd" :
    day % 10 === 3 && day !== 13 ? "rd" : "th";

  const datePart = `${day}${suffix} ${month} ${year} (${weekday})`;

  const timePart = d
    .toLocaleString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace("am", "AM")
    .replace("pm", "PM");

  return `${datePart} • ${timePart}`;
}
