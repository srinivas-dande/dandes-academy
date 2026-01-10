'use client';
import { useState, useEffect } from 'react';

export default function LeadCapture() {
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

  const downloadBrochure = () => {
    window.open('/brochures/aiml.pdf', '_blank');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.full_Name.trim() || !form.email.trim()) {
      setError('Name and Email are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/da-api/lead-capture', {
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
      const isDuplicateLead = data?.code === 'DUPLICATE_LEAD';

      if (!res.ok && !isDuplicateLead) {
        setError(data?.error || 'Failed to submit lead');
        return;
      }

      if (!isDuplicateLead) {
        setSuccess(true);
      }

      downloadBrochure();

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
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-5 items-center">

          {/* Left text block */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-3">
              Get the Detailed Course Brochure
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Enter your details below to download the complete{' '}
              <span className="font-semibold text-[#AD1612]">
                AI/ML Course Coverage PDF
              </span>{' '}
              instantly and explore all 15 modules.
            </p>
          </div>

          {/* Right form card */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8">
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
                  🎉 Brochure downloaded successfully!
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
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
                    className="w-28 rounded-lg border border-gray-300 px-2 py-2"
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
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#AD1612] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
              >
                {loading ? 'Submitting…' : 'Download Brochure (PDF)'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to be contacted via Email/WhatsApp/Phone.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
