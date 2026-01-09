"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import LeadForm from "./LeadForm";

export default function Hero() {
  const [webinar, setWebinar] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isFallback, setIsFallback] = useState(false);

  // ✅ Fetch latest running webinar
  useEffect(() => {
    async function fetchWebinar() {
      try {
        const res = await fetch("/emp-api/webinars/latest");
        const data = await res.json();

        if (data.ok && data.data?.length > 0) {
          setWebinar(data.data[0]);
          setIsFallback(false);
        } else {
          console.warn("No running webinar found, using fallback timer");
          setWebinar(null);
          setIsFallback(true);
        }
      } catch (err) {
        console.error("Error fetching webinar:", err);
        setWebinar(null);
        setIsFallback(true);
      }
    }

    fetchWebinar();
  }, []);

  // ✅ Countdown logic
  useEffect(() => {
    let interval;

    function startFallbackTimer() {
      console.log("🕒 Switching to fallback 24-hour timer...");
      let diff = 24 * 60 * 60 * 1000; // 24 hours
      setIsFallback(true);
      setTimeLeft(diff);
      interval = setInterval(() => {
        diff = Math.max(0, diff - 1000);
        setTimeLeft(diff);
      }, 1000);
    }

    if (webinar && webinar.dateTime) {
      const target = new Date(webinar.dateTime).getTime();
      interval = setInterval(() => {
        const now = Date.now();
        const diff = target - now;

        if (diff <= 0) {
          // ✅ Webinar time finished → start fallback timer
          clearInterval(interval);
          startFallbackTimer();
        } else {
          setTimeLeft(diff);
        }
      }, 1000);
    } else {
      // ✅ No active webinar → start fallback immediately
      startFallbackTimer();
    }

    return () => clearInterval(interval);
  }, [webinar]);

  // ✅ Calculate time parts
  const days = timeLeft ? Math.floor(timeLeft / (1000 * 60 * 60 * 24)) : 0;
  const hours = timeLeft ? Math.floor((timeLeft / (1000 * 60 * 60)) % 24) : 0;
  const minutes = timeLeft ? Math.floor((timeLeft / (1000 * 60)) % 60) : 0;
  const seconds = timeLeft ? Math.floor((timeLeft / 1000) % 60) : 0;

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-8 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
              Master <span className="text-[#AD1612]">AI/ML</span> — Build Industry-Ready Skills
            </h1>

            <ul className="mt-5 space-y-3 text-gray-700 text-base">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-0.5 text-[#AD1612]" />
                <span>Assignmnets, Mini projects and one end-to-end Capstone</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-0.5 text-[#AD1612]" />
                <span>Live weekend classes, LMS access, Doubt Support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-0.5 text-[#AD1612]" />
                <span>ML, Deep Learning, NLP, GenAI/LLMs, Agentatic AI and MLOps</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mt-0.5 text-[#AD1612]" />
                <span>Resume Review + Mock Interviews — Interview-Ready</span>
              </li>
            </ul>

            {/* ✅ Countdown Section */}
            <div className="mt-10 text-center">
              <p className="text-lg font-semibold text-gray-700 mb-3 tracking-wide">
                {isFallback
                  ? "NEXT WEBINAR STARTS IN"
                  : webinar?.dateTime
                  ? `NEXT WEBINAR: ${formatDateTime(webinar.dateTime)}`
                  : "NEXT WEBINAR STARTS IN"}
              </p>

              <div className="inline-flex items-stretch justify-center gap-4">
                {[
                  { label: "DAYS", value: String(days).padStart(2, "0") },
                  { label: "HRS", value: String(hours).padStart(2, "0") },
                  { label: "MINS", value: String(minutes).padStart(2, "0") },
                  { label: "SEC", value: String(seconds).padStart(2, "0") },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="w-20 sm:w-24 rounded-xl bg-white shadow-sm py-3"
                  >
                    <p className="text-3xl sm:text-4xl font-extrabold text-[#AD1612] leading-none">
                      {b.value}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 tracking-wider">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div id="lead-form" className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 id="free-ai-ml-webinar" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Free AI & Machine Learning Webinar
            </h2>
  <p className="text-sm text-gray-700 mb-4">
      Free AI/ML webinar for Professionals and Job Seekers to learn career roadmap, 
      and how to start AI & Machine Learning with industry-focused training.
    </p>
              <p className="text-sm text-gray-600 mb-6">
                Join the live session on{" "}
                <span className="text-gray-900 font-semibold">
                  {webinar?.dateTime ? formatDateTime(webinar.dateTime) : "upcoming date"}.
                </span>
              </p>
              <LeadForm submitLabel="Register for Free AI/ML Webinar" />
            </div>
          </div>
        </div>
      </div>
    </section>
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


