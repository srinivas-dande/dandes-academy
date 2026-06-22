"use client"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { isValidPhoneNumber } from "libphonenumber-js"
 
const countries = [
  { code: "IN", dial: "+91" },   // India
  { code: "US", dial: "+1" },    // United States
  { code: "CA", dial: "+1" },    // Canada
  { code: "GB", dial: "+44" },   // United Kingdom
  { code: "AU", dial: "+61" },   // Australia
  { code: "AE", dial: "+971" },  // UAE
  { code: "SG", dial: "+65" },   // Singapore
  { code: "DE", dial: "+49" },   // Germany
  { code: "FR", dial: "+33" },   // France
  { code: "NL", dial: "+31" },   // Netherlands
  { code: "IE", dial: "+353" },  // Ireland
  { code: "NZ", dial: "+64" },   // New Zealand
  { code: "SA", dial: "+966" },  // Saudi Arabia
  { code: "QA", dial: "+974" },  // Qatar
  { code: "KW", dial: "+965" },  // Kuwait
  { code: "OM", dial: "+968" },  // Oman
  { code: "BH", dial: "+973" },  // Bahrain
  { code: "ZA", dial: "+27" },   // South Africa
  { code: "MY", dial: "+60" },   // Malaysia
  { code: "JP", dial: "+81" },   // Japan
]

export function AimlRegistrationForm() {



  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",

    lead_status: "New Lead",
    lead_source: "",
    lead_sub_source: "",
  }) 
  const [successMsg, setSuccessMsg] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState("+91")
 
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setFormData((prev) => ({
      ...prev, 
      lead_status: params.get("lead_status") || "New Lead",
      lead_source: params.get("lead_source") || "DA Network",
      lead_sub_source: params.get("lead_sub_source") || "",
    }));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading || successMsg) return

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Name, Email and Phone are required")
      return
    }

    const fullPhone = `${countryCode}${formData.phone}`

    if (!isValidPhoneNumber(fullPhone)) {
      setPhoneError("Enter a valid phone number")
      return
    }

    setPhoneError("")

    setLoading(true)
 
  
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: `${countryCode}${formData.phone}`,
      lead_status: formData.lead_status,
      lead_source: formData.lead_source,
      lead_sub_source: formData.lead_sub_source,

    }

    try {
      const res = await fetch("/api/batch3-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (data.success) {
        setSuccessMsg("You are registered successfully!")
        setFormData((prev) => ({
          ...prev,
          fullName: "",
          email: "",
          phone: "",
        }));
        
      } else {
        alert(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      id="registration-form"
      className="bg-white p-6 lg:p-8 w-full max-w-[510px]  border border-[#D8D8D8]"
      style={{
        borderRadius: '13.24px',
        boxShadow: '0 0 28.42px 0 rgba(0, 149, 255, 0.17)',
      }} 
    >
      <h2 className="text-xl font-bold mb-2" style={{ color: "#000000" }}>
        Get course fee, syllabus, and next batch details
      </h2>
      <p className="text-gray-600 text-sm mb-6">
        Fill this once, and we will share course details on WhatsApp, email, or call you back.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Full Name
          </label>
          <input
            required
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d12027] focus:ring-1 focus:ring-[#d12027]"
            style={{ color: "#000000", opacity: 1 }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Email
          </label>
          <input
            required
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d12027] focus:ring-1 focus:ring-[#d12027]"
            style={{ color: "#000000", opacity: 1 }}
          />
        </div>

        <div>
        <label className="block text-sm font-medium text-black mb-2">
          Phone No.
        </label>

        <div className="flex gap-2">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2.5 bg-white text-black"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.dial}>
                {country.code} {country.dial}
              </option>
            ))}
          </select>

          <input
            required
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => {
              setPhoneError("")

              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, ""),
              })
            }}
            className="flex-1 border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d12027] focus:ring-1 focus:ring-[#d12027]"
            style={{ color: "#000000" }}
          />
          
        </div>
        {phoneError && (
          <p className="text-red-600 text-sm mt-1">
            {phoneError}
          </p>
        )}
      </div>

        {successMsg && (
          <div
            className="p-4 rounded-lg border border-green-300 bg-green-50 text-sm font-semibold text-center"
            style={{ color: "#16813d" }}
          >
            ✓ {successMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !!successMsg}
          style={{
            backgroundColor: "#d12027",
            color: "#ffffff",
            border: "none",
            opacity: loading ? 0.6 : 1,
          }}
          className={`py-3 px-6 rounded font-medium flex items-center justify-center gap-2 mt-2 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? "Submitting..." : "Register For More details"}
          <ArrowRight className="size-4" />
        </button>

        <p className="text-xs text-gray-500">
          *By submitting, you agree to be contacted via Email, WhatsApp, or Phone.
        </p>
        <p className="text-xs text-gray-400 text-center">
          We keep your details private, and we do not spam.
        </p>
      </form>
    </div>
  )
}