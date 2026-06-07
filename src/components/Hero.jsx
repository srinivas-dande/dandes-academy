"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import LeadForm from "./LeadForm";

export default function Hero() {
  const [webinar, setWebinar] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });
  const [isFallback, setIsFallback] = useState(false);
    const [webinarTime, setWebinarTime] = useState(null)


  // ✅ Fetch latest running webinar
  useEffect(() => {
    async function fetchWebinar() {
      try {
        const res = await fetch("/emp-api/webinars/latest");
        const data = await res.json();

        if (data.ok && data.data?.length > 0) {
          const webinarData = data.data[0];

          setWebinar(webinarData);
          setWebinarTime(new Date(webinarData.dateTime));
          setIsFallback(false);
        } else {
          console.warn("No running webinar found, using fallback timer");

          const fallbackDate = new Date();
          fallbackDate.setDate(fallbackDate.getDate() + 3);

          setWebinar(null);
          setWebinarTime(fallbackDate);
          setIsFallback(true);
        }
      } catch (err) {
        console.error("Error fetching webinar:", err);

  const fallbackDate = new Date();
  fallbackDate.setDate(fallbackDate.getDate() + 3);

  setWebinar(null);
  setWebinarTime(fallbackDate);
  setIsFallback(true);
      }
    }

    fetchWebinar();
  }, []);

  

  // ✅ Countdown logic
  useEffect(() => {
    if (!webinarTime) return

    const timer = setInterval(() => {
      const now = new Date()
      const difference = webinarTime - now

      if (difference <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const mins = Math.floor((difference / (1000 * 60)) % 60)
      const secs = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, mins, secs })
    }, 1000)

    return () => clearInterval(timer)
  }, [webinarTime])



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
            <div className="mt-8">
              <h3 className="text-lg font-bold text-black mb-4">
                NEW BATCH DEMO STARTS IN
              </h3>

              <div className="flex gap-4 mt-2">
                <div className="text-center bg-white rounded-md px-4 py-2 shadow-sm">
                  <p className="text-3xl font-bold text-red-600">
                    {String(timeLeft.days).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-gray-700 uppercase tracking-wide">Days</p>
                </div>

                <div className="text-center bg-white rounded-md px-4 py-2 shadow-sm">
                  <p className="text-3xl font-bold text-red-600">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-gray-700 uppercase tracking-wide">Hrs</p>
                </div>

                <div className="text-center bg-white rounded-md px-4 py-2 shadow-sm">
                  <p className="text-3xl font-bold text-red-600">
                    {String(timeLeft.mins).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-gray-700 uppercase tracking-wide">Mins</p>
                </div>

                <div className="text-center bg-white rounded-md px-4 py-2 shadow-sm">
                  <p className="text-3xl font-bold text-red-600">
                    {String(timeLeft.secs).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-gray-700 uppercase tracking-wide">Sec</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div id="lead-form" className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <h2 id="free-ai-ml-webinar" className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Get course fee, syllabus, and next batch details
            </h2>
  <p className="text-sm text-gray-700 mb-4">
      Fill this once, and we will share course details on WhatsApp, email, or call you back.
    </p>
              <p className="text-sm text-gray-600 mb-6">
                Join the New Batch Demo on {" "}
                <span className="text-gray-900 font-semibold">
                  {webinar?.dateTime ? formatDateTime(webinar.dateTime) : "upcoming date"}.
                </span>
              </p>
              <LeadForm submitLabel="Register for More details" />
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


