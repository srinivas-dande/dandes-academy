"use client";

import Card from "@/components/emp/Card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function AddLeadPage() {
  const [lead, setLead] = useState({
    full_Name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    course_Interested: "",
    lead_source: "",
    Remarks: "",
  });

  const searchParams = useSearchParams();
  const [prefilled, setPrefilled] = useState(false);


  useEffect(() => {
    if (prefilled) return;

    const fullName = searchParams.get("fullName") || "";
    const email = searchParams.get("email") || "";
    const phone = searchParams.get("phone") || "";

    if (fullName || email || phone) {
      setLead((prev) => ({
        ...prev,
        full_Name: fullName,
        email,
        phone: phone.replace(/\D/g, ""),
      }));
      setPrefilled(true);
    }
  }, [searchParams, prefilled]);



  const [msg, setMsg] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setLead((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!lead.full_Name || !lead.email || !lead.phone || !lead.course_Interested) {
      setMsg({ type: "error", text: "Please fill all required fields." });
      return;
    }

    try {
      const res = await fetch("/emp-api/add-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: lead.full_Name,
          email: lead.email,
          phone: `${lead.countryCode} ${lead.phone}`,
          courseInterested: lead.course_Interested,
          leadsource: lead.lead_source, // unchanged
          remarks: lead.Remarks,
        }),
      });

      const data = await res.json();

      // ✅ SAFE UI HANDLING (NO THROW)
      if (!res.ok) {
        setMsg({
          type: "error",
          text: data?.error || "Failed to add lead",
        });
        return;
      }

      // ✅ SUCCESS
      setMsg({ type: "ok", text: "Lead added successfully!" });

      setLead({
        full_Name: "",
        email: "",
        phone: "",
        countryCode: "+91",
        course_Interested: "",
        lead_source: "",
        Remarks: "",
      });

      setTimeout(() => setMsg(null), 5000);
    } catch (error) {
      console.error("Error submitting lead:", error);
      setMsg({ type: "error", text: "Server error. Please try again." });
    }
  }

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Add New Lead</h2>

        {msg && (
          <span
            className={`text-sm font-medium ${
              msg.type === "ok" ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg.text}
          </span>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              name="full_Name"
              value={lead.full_Name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={lead.email}
              onChange={handleChange}
              placeholder="rahul@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-3">
              <select
                name="countryCode"
                value={lead.countryCode}
                onChange={(e) =>
                  setLead((prev) => ({ ...prev, countryCode: e.target.value }))
                }
                className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
                <option value="+971">🇦🇪 +971</option>
              </select>

              <input
                name="phone"
                value={lead.phone}
                onChange={handleChange}
                placeholder="9876543210"
                inputMode="numeric"
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Interested <span className="text-red-500">*</span>
            </label>
            <select
              name="course_Interested"
              value={lead.course_Interested}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            >
              <option value="">Select course</option>
              <option>AI/ML Course</option>
              <option>System Design Course</option>
              <option>DSA Course</option>
              <option>Java Full Stack Development Course</option>
              <option>Spring Boot & Micro Services</option>
              <option>Angular Course</option>
              <option>React Course</option>
              <option>AWS Course</option>
              <option>Devops Course</option>
            </select>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              name="Remarks"
              value={lead.Remarks}
              onChange={handleChange}
              rows={4}
              placeholder="Any comments or details about this lead..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm 
              focus:outline-none focus:ring-2 focus:ring-[#AD1612]/30 focus:border-[#AD1612]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-[#AD1612] px-5 py-2 
            text-sm font-semibold text-white shadow hover:bg-[#92100E] transition"
          >
            Save Lead
          </button>

          <button
            type="button"
            onClick={() =>
              setLead({
                full_Name: "",
                email: "",
                phone: "",
                countryCode: "+91",
                course_Interested: "",
                lead_source: "",
                Remarks: "",
              })
            }
            className="inline-flex items-center justify-center rounded-lg border border-[#AD1612] 
            px-5 py-2 text-sm font-semibold text-[#AD1612] hover:bg-red-50 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </Card>
  );
}
