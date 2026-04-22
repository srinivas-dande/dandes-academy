"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const webinars = [
  {
    webinarId: "WB-18th-Feb-26",
    link: "/webinars/how-to-become-an-ai-engineer-or-ml-engineer",
    buttonText: "Completed",
    disabled: true

  },
  {
    webinarId: "WB-28th-Apr-26",
    link: "/webinars/software-engineers-switch-to-ai-career",
    buttonText: "Register",
    disabled: false
  },
];




export default function WebinarHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const loadCounts = async () => {
      const newCounts = {};

      for (const webinar of webinars) {
        try {
          const res = await fetch(
            `/da-api/webinars?webinarId=${webinar.webinarId}`
          );
          const data = await res.json();
          newCounts[webinar.webinarId] = data.count || 0;
        } catch {
          newCounts[webinar.webinarId] = 0;
        }
      }

      setCounts(newCounts);
    };

    loadCounts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4">

      {/* Heading */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          AI & Machine Learning <span className="text-[#AD1612]">Webinars</span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Live AI & ML webinars by Srinivas Dande, Founder & Lead Trainer at Dandes Academy.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {webinars.map((webinar, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 group"
          >

            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={`/webinars/${webinar.webinarId}.png`}
                alt={webinar.webinarId}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
              />
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between px-4 py-4">

              {/* Count */}
              <div className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                📈 <span className="text-lg font-semibold">{counts[webinar.webinarId] || 0}</span> registered
              </div>

              {/* Button */}
              {webinar.disabled ? (
               <button
                 disabled
                 className="text-sm bg-gray-300 text-gray-600 px-4 py-2 rounded-md font-semibold cursor-not-allowed"
                >
                 {webinar.buttonText}
                </button>
              ) : (
                <Link
                  href={webinar.link}
                  className="text-sm bg-[#AD1612] hover:bg-[#8f120f] text-white px-4 py-2 rounded-md font-semibold transition transform hover:scale-105"
                >
                  {webinar.buttonText}
                </Link>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}