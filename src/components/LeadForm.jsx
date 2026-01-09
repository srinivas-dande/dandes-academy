'use client';
import { useState, useEffect } from 'react';


export default function LeadForm({ submitLabel = 'Register Now' }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    full_Name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    course_Interested: 'AI/ML Course',
    lead_source: 'Website',
    lead_ad_source: 'Direct',
    Remarks: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');

    if (utmSource) {
      setForm((f) => ({
        ...f,
        lead_ad_source: utmSource.toLowerCase(),
      }));
    }
  }, []);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.full_Name.trim() || !form.email.trim()) {
      setError('Name and Email are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/da-api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_Name: form.full_Name.trim(),
          email: form.email.trim(),
          phone: form.phone
            ? `${form.countryCode} ${form.phone.trim()}`
            : '',
          course_Interested: form.course_Interested,
          lead_source: form.lead_source,
          lead_ad_source: form.lead_ad_source,
          Remarks: form.Remarks || 'NA',
        }),
      });

      const data = await res.json();

      const isDuplicateLead = data?.code === "DUPLICATE_LEAD";

      // ❌ real failure → stop
      if (!res.ok && !isDuplicateLead) {
        setError(data?.error || 'Failed to submit lead');
        return;
      }

      // ✅ SUCCESS (new lead only)
  if (!isDuplicateLead) {
    setSuccess(true);

    // 🔥 GA4 REAL LEAD EVENT
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "lead_form_submit", {
        event_category: "conversion",
        event_label: "Webinar Registration",
        lead_source: form.lead_source,
        lead_ad_source: form.lead_ad_source,
      });
    }
  }


      // ✅ DUPLICATE → show backend message
      if (isDuplicateLead) {
        setError(data.error);
      }

      setForm({
        full_Name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        course_Interested: 'AI/ML Course',
        lead_source: 'Website',
        lead_ad_source: 'Direct',
        Remarks: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-2">
        <span className="h-1.5 w-16 rounded bg-[#AD1612]" />
        <span className="h-1.5 w-16 rounded bg-rose-100" />
        <span className="h-1.5 w-16 rounded bg-rose-100" />
        <span className="h-1.5 w-16 rounded bg-rose-100" />
      </div>

      {success && (
        <div className="rounded-md bg-green-50 border border-green-200 text-green-700 px-3 py-2 text-sm font-medium">
          🎉 You have successfully registered for the webinar!
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Full Name
        </label>
        <input
          name="full_Name"
          value={form.full_Name}
          onChange={onChange}
          placeholder="Firstname Lastname"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-[#AD1612]"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Enter email address"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-400 focus:ring-2 focus:ring-[#AD1612]"
          required
        />
      </div>

      {/* Contact Number */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">
          Contact Number
        </label>
        <div className="flex gap-2">
          <select
            name="countryCode"
            value={form.countryCode}
            onChange={onChange}
            className="w-28 rounded-lg border border-gray-300 px-2 py-2 bg-white text-gray-900"
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
            <option value="+61">🇦🇺 +61</option>
            <option value="+971">🇦🇪 +971</option>
          </select>

          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Enter phone number"
            inputMode="numeric"
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-400"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#AD1612] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
      >
        {loading ? 'Submitting…' : submitLabel}
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting, you agree to be contacted via Email/WhatsApp/Phone.
      </p>
    </form>
  );
}
