"use client";

import { useState } from "react";

export default function FeedbackForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsappNumber: "",
    webinarRating: "",
    clarityLevel: "",
    helpfulParts: [],
    targetRoles: [],
    biggestChallenges: [],
    programInterest: "",
    sessionFeedback: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckbox = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/da-api/webinar-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Submission failed. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 space-y-6 text-gray-900"
    >

      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          Full Name <span className="text-red-500">*</span>
        </label>

        <input
          required
          className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
      </div>


    
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          Email ID <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          WhatsApp Number <span className="text-red-500">*</span>
        </label>

        <input
          type="tel"
          required
          inputMode="numeric"
          pattern="[0-9]{10}"
          maxLength={10}
          placeholder="Enter 10-digit WhatsApp number"
          className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => handleChange("whatsappNumber", e.target.value)}
        />
      </div>


      


      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          How would you rate the webinar overall? <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { value: 1, label: "Excellent" },
            { value: 2, label: "Good" },
            { value: 3, label: "Average" },
            { value: 4, label: "Need to Improve" },

          ].map((item) => (
            <label
              key={item.value}
              className="flex items-center gap-3 text-gray-800"
            >
              <input
                type="radio"
                name="rating"
                value={item.value}
                required
                onChange={() =>
                  handleChange("webinarRating", item.value)
                }
              />
              <span>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>


      
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          Was the difference between AI Engineer & ML Engineer clearly explained? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {["Very Clear", "Somewhat Clear", "Still Confused"].map((v) => (
            <label key={v} className="flex items-center gap-2 text-gray-800">
              <input
                type="radio"
                name="clarity"
                required
                onChange={() => handleChange("clarityLevel", v)}
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          Which part helped you most? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            "Role Comparison",
            "Salary Discussion",
            "Roadmap",
            "Real Industry Examples",
            "Tools & Skills Breakdown",
          ].map((v) => (
            <label key={v} className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                onChange={() => handleCheckbox("helpfulParts", v)}
                
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          Which role are you planning to target? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {["AI Engineer", "ML Engineer", "Not Sure Yet"].map((v) => (
            <label key={v} className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                onChange={() => handleCheckbox("targetRoles", v)}
                
              />
              {v}
            </label>
          ))}
        </div>
      </div>

    
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          What is your biggest challenge currently? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            "No proper roadmap",
            "Weak in programming",
            "Weak in math",
            "No real-time projects",
            "No interview guidance",
            "Confused between roles",
          ].map((v) => (
            <label key={v} className="flex items-center gap-2 text-gray-800">
              <input
                type="checkbox"
                onChange={() => handleCheckbox("biggestChallenges", v)}
                
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          Are you interested in joining Dandes Academy AI/ML Program? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {[
            "Yes – I am ready to enroll",
            "Yes – Need more details",
            "Maybe – Need career counseling call",
            "Not Now",
          ].map((v) => (
            <label key={v} className="flex items-center gap-2 text-gray-800">
              <input
                type="radio"
                name="interest"
                required
                onChange={() => handleChange("programInterest", v)}
              />
              {v}
            </label>
          ))}
        </div>
      </div>

      
      <div>
        <label className="block mb-1 text-lg font-semibold text-gray-800">
          What did you like most about the session?
        </label>
        <textarea
          className="w-full border border-gray-300 p-3 rounded text-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          rows={4}
          onChange={(e) =>
            handleChange("sessionFeedback", e.target.value)
          }
        />
      </div>

      <button
        type="submit"
        className="w-full  text-white py-3 rounded font-semibold bg-[#AD1612] transition"
      >
        Submit Feedback
      </button>
    </form>
  );
}
