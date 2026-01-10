"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Card from "@/components/enrollment/Card";


function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export default function EnrollmentFormClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlLeadId = searchParams.get("leadId")?.trim() ?? "";
  const urlName = searchParams.get("name")?.trim() ?? "";
  const urlEmail = searchParams.get("email")?.trim() ?? "";
  const urlPhone = searchParams.get("phone")?.trim() ?? "";
  const urlCourse = searchParams.get("course")?.trim() ?? "";
  const leadCourseId = Number(searchParams.get("leadCourseId") ?? "");


  const [leadId, setLeadId] = useState(urlLeadId || "");
  const [loadingLead, setLoadingLead] = useState(false);
  const [leadError, setLeadError] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    course: "",
    batchId: "", 
    totalFee: "",
    installments: "1",
  });

  const [batches, setBatches] = useState([]);

  const [installmentsList, setInstallmentsList] = useState([
    { installmentNo: 1, dueDate: "", amount: "", status: "Unpaid" },
  ]);

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [createdResult, setCreatedResult] = useState(null);

  useEffect(() => {
    if (urlLeadId) {
      setForm({
        id: urlLeadId,
        name: urlName,
        email: urlEmail,
        phone: urlPhone,
        course: urlCourse,
        batchId: "",
        totalFee: "",
        installments: "1",
      });

      setLeadId(urlLeadId);
    }
  }, [urlLeadId]);


  useEffect(() => {
  if (!form.course) {
    setBatches([]);
    return;
  }

  async function loadBatches() {
    try {
      const res = await fetch(
        `/emp-api/batches?courseName=${encodeURIComponent(form.course)}`
      );
      const data = await res.json();

      if (data.ok && data.data.length > 0) {
        setBatches(data.data);
      } else {
        
        setBatches([{ batchId: "Self-Paced" }]);
      }

    } catch (err) {
      console.error("Failed to fetch batches", err);
      setBatches([]);
    }
  }

  loadBatches();
}, [form.course]);


  async function searchLead() {
    if (!leadId.trim()) return;

    setLeadError("");
    setLoadingLead(true);
    setCreatedResult(null);
    setMsg("");

    try {
      const res = await fetch(`/emp-api/leads/${leadId}`);
      const body = await res.json();

      if (!res.ok || !body.ok) {
        setLeadError("Lead not found");
        setLoadingLead(false);
        return;
      }

      const lead = body.data;
      print(lead)
      setForm((p) => ({
        ...p,
        id: String(lead.lead_Id ?? ""),
        name: String(lead.full_Name ?? ""),
        email: String(lead.email ?? ""),
        phone: String(lead.phone ?? ""),
        course: String(lead.course ?? ""),
      }));
    } catch (e) {
      setLeadError("Error fetching lead");
    }

    setLoadingLead(false);
  }

  function setField(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  function handleInstallmentCountChange(e) {
    const count = Number(e.target.value);
    setForm((p) => ({ ...p, installments: e.target.value }));

    const today = new Date();
    const newList = [];

    for (let i = 1; i <= count; i++) {
      const dueDate = addMonths(today, i - 1);
      const formatted = dueDate.toISOString().split("T")[0];

      newList.push({
        installmentNo: i,
        dueDate: formatted,
        amount: "",
        status: "Unpaid",
      });
    }

    setInstallmentsList(newList);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setMsg("");
    setCreatedResult(null);

    const payload = {
      leadId: form.id || undefined,
      leadCourseId,
      name: form.name,
      email: form.email,
      phone: form.phone,
      course: form.course,
      batchId: form.batchId,
      totalFee: Number(form.totalFee || 0),
      installmentsList,
    };

    try {
      const res = await fetch("/enrollment-api/enrollment-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await res.json();

      if (!res.ok || !body.ok) {
        setMsg(body.error || "Failed to save");
        setSaving(false);
        return;
      }

      /* 🔔 IMPORTANT: notify Lead page to refresh */
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("refresh-lead"));
      }

      router.push(`/myhome/enrollments/${body.data.studentId}`);
      return;
    } catch {
      setMsg("Server error");
    }

    setSaving(false);
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 mb-16">
      <Card
        title={
          <div className="flex items-center justify-between">
            <span>Enrollment Form</span>
            {form.id && (
              <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                Lead ID: {form.id}
              </span>
            )}
          </div>
        }
      >
        
        <div className="mb-6 p-5 bg-gray-50 rounded-lg border shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Search by Lead ID
          </label>

          <div className="flex gap-3">
            <input
              type="text"
              value={leadId}
              onChange={(e) => setLeadId(e.target.value)}
              placeholder="Enter Lead ID"
              className="flex-1 border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={searchLead}
              disabled={loadingLead}
              className="px-5 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
              {loadingLead ? "Searching..." : "Search"}
            </button>
          </div>

          {leadError && <p className="text-sm text-red-600 mt-2">{leadError}</p>}
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField label="Full Name" name="name" value={form.name} onChange={setField} />

            
            <div>
              <label className="text-sm font-medium text-gray-700">Course</label>
              <select
                name="course"
                value={form.course}
                onChange={setField}
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm 
                           focus:ring-2 focus:ring-blue-500 bg-white"
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

            
            <div>
              <label className="text-sm font-medium text-gray-700">Batch Id</label>
              <select
                name="batchId"
                value={form.batchId}
                onChange={setField}
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Batch</option>

                {batches.map((b) => (
                  <option key={b.batchId} value={b.batchId}>
                    {b.batchId}
                  </option>
                ))}
              </select>

            </div>

            <InputField label="Email" name="email" value={form.email} onChange={setField} />
            <InputField label="Phone" name="phone" value={form.phone} onChange={setField} />
            <InputField label="Total Fee" name="totalFee" value={form.totalFee} onChange={setField} />

            
            <div>
              <label className="text-sm font-medium text-gray-700">
                Number of Installments
              </label>
              <select
                name="installments"
                value={form.installments}
                onChange={handleInstallmentCountChange}
                className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm 
                           focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          
          <Card title="Installment Schedule">
            <div className="space-y-3">
              {installmentsList.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 bg-white p-3 rounded-lg border"
                >
                  <div className="text-center font-semibold">{row.installmentNo}</div>

                  <input
                    type="date"
                    value={row.dueDate}
                    onChange={(e) => {
                      const list = [...installmentsList];
                      list[index].dueDate = e.target.value;
                      setInstallmentsList(list);
                    }}
                    className="border px-3 py-2 rounded-md"
                  />

                  <input
                    type="number"
                    value={row.amount}
                    onChange={(e) => {
                      const list = [...installmentsList];
                      list[index].amount = e.target.value;
                      setInstallmentsList(list);
                    }}
                    placeholder="Amount"
                    className="border px-3 py-2 rounded-md no-spinner"
                  />

                  <div className="text-yellow-700 font-semibold text-center">
                    Unpaid
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold shadow hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Submit Enrollment"}
          </button>

          {msg && <p className="text-center text-green-600 mt-2">{msg}</p>}
        </form>
      </Card>
    </div>
  );
}

function InputField({ label, name, value, onChange, readOnly }) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        name={name}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className="mt-1 w-full border rounded-md px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-gray-100"
      />
    </div>
  );
}
