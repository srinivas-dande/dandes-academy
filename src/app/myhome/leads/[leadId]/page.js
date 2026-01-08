"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function format12Hour(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("en-IN", {
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LeadFullViewPage() {
  const { leadId } = useParams();
  const numericLeadId = Number(leadId);

  const [courseName, setCourseName] = useState("");



  const [lead, setLead] = useState(null);
  const [tags, setTags] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("New");
  const [followDate, setFollowDate] = useState("");
  const [followTime, setFollowTime] = useState("");
  const [note, setNote] = useState("");
  const [newTag, setNewTag] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBodyHtml, setEmailBodyHtml] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [attachmentUrl, setAttachmentUrl] = useState(null);

  const editorRef = useRef(null);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const timerRef = useRef(null);

  function applyFormat(command) {
    if (!editorRef.current) return;

    editorRef.current.focus();
    document.execCommand(command, false, null);
  }

  function handleRemoveAttachment() {
    setAttachment(null);
    setAttachmentUrl(null);
  }

  const statusOptions = [
    "New",
    "Contacted",
    "Interested",
    "Not Interested",
    "Confirmed for Demo",
    "Demo attended",
    "Enrolled",
  ];

  
  // Append activity locally for opticmatic
  function appendActivityLocally(activity) {
    setTimeline((prev) => [activity, ...prev]);
  }

  // -------------------------
  // Fetch lead details
  // -------------------------
  useEffect(() => {
    if (!numericLeadId) return;
    async function fetchLead() {
      try {
        setLoading(true);
        const res = await fetch(`/emp-api/leads/${numericLeadId}`, {
          cache: "no-store",
        });

        const text = await res.text();
        let json;

        try {
          json = JSON.parse(text);
        } catch {
            console.error("Lead API returned non-JSON:", text);
            setLead(null);
            return;
          }


        if (!json.ok) {
          console.error("Failed to load lead:", json.error);
          setLead(null);
          return;
        }
        const l = json.data;
        const resolvedCourseName =
          l.courses && l.courses.length > 0 && l.courses[0].courseInterested
            ? l.courses[0].courseInterested
          : l.courseInterested || "Our Course";


        setCourseName(resolvedCourseName);



        // set local states
        setLead(l);
        setTags((l.tags || []).map((t) => t.tag));
        setStatus(l.leadStatus ?? "New");


        // prefill followup
        if (l.nextFollowupRaw) {
          const d = new Date(l.nextFollowupRaw);
          setFollowDate(d.toISOString().slice(0, 10));
          setFollowTime(d.toTimeString().slice(0, 5));    
        } else {
          setFollowDate("");
          setFollowTime("");
        }

        setEmailSubject(`Course Details - ${resolvedCourseName} (Dandes Academy)`);

        setEmailBodyHtml(
          `Hello ${l.fullName ?? "Student"},<br/><br/>

            Thank you for speaking with our team today.<br/><br/>

          As discussed, please find attached the <b>Detailed Syllabus for the ${resolvedCourseName}</b>.<br/><br/>

          If you have any questions after reviewing the syllabus, feel free to contact our team.
          We will be happy to clarify and guide you further.<br/><br/>

          Looking forward to assisting you in your learning journey.<br/><br/>

          Regards,<br/>
          <b>Srinivas Dande</b><br/>
          Founder &amp; Instructor<br/>
          <b>Dandes Academy</b>`
        );

        // -------------------
        // Load default syllabus file
        // -------------------
        async function loadDefaultAttachment() {
          try {
            const res = await fetch("/emp-api/uploads/syllabus-info", { cache: "no-store" });
            const text = await res.text();
            let json;

            try {
              json = JSON.parse(text);
            } catch {
              console.error("Syllabus-info API returned non-JSON:", text);
              return;
            }


            if (json.ok && json.fileName) {
              const url = `/uploads/syllabus/${json.fileName}`;   // ⭐ Correct path
              setAttachmentUrl(url);
              setAttachment({ name: json.fileName }); // show name in modal
            }
          } catch (err) {
            console.error("Default attachment load failed:", err);
          }
        }
        loadDefaultAttachment();


      } catch (err) {
        console.error("Lead fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLead();
  }, [numericLeadId]);

  // -------------------------
  // Fetch activities/timeline
  // -------------------------
  useEffect(() => {
    if (!numericLeadId) return;
    async function fetchActivities() {
      try {
        const res = await fetch(`/emp-api/leads/${numericLeadId}/activities`);
        const text = await res.text();
        let json;

        try {
          json = JSON.parse(text);
        } catch {
            console.error("Activities API returned non-JSON:", text);
            setTimeline([]);
            return;
          }


        if (json.ok) {
          setTimeline(json.data || []);
        } else {
          console.error("Activities load error", json.error);
        }
      } catch (err) {
        console.error("Activities fetch error", err);
      }
    }
    fetchActivities();
  }, [numericLeadId]);

  // -------------------------
  // Fetch users for Assigned To dropdown
  // -------------------------


  // clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showEmailModal && editorRef.current) {
      editorRef.current.innerHTML = emailBodyHtml || "";
    }
  }, [showEmailModal]);


  // -------------------------
  // TAGS
  // -------------------------
  async function addTag() {
    const t = newTag.trim();
    if (!t) return;
    if (tags.includes(t)) {
      setNewTag("");
      return;
    }

    // optimistic
    setTags((prev) => [...prev, t]);
    setNewTag("");

    try {
      const res = await fetch(`/emp-api/leads/${numericLeadId}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag: t }),
      });
      const json = await res.json();
      if (!json.ok) {
        console.error("Add tag failed", json.error);
      }
      appendActivityLocally({
        id: Date.now().toString(),
        activityType: "tag_added",
        title: "Tag Added",
        description: `Added tag: ${t}`,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Add tag error", err);
    }
  }

  async function removeTag(tag) {
    // optimistic
    setTags((prev) => prev.filter((x) => x !== tag));

    try {
      const res = await fetch(`/emp-api/leads/${numericLeadId}/tags`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tag }),
      });
      const json = await res.json();
      if (!json.ok) {
        console.error("Remove tag failed", json.error);
      }
      appendActivityLocally({
        id: Date.now().toString(),
        activityType: "tag_removed",
        title: "Tag Removed",
        description: `Removed tag: ${tag}`,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Remove tag error", err);
    }
  }

  // -------------------------
  // QUICK ACTIONS - Save
  // -------------------------
  async function handleSaveActions() {
    if (!lead) return;

    const payload = {
      note: note || null,
      leadStatus: status,

      nextFollowup:
        followDate || followTime
          ? new Date(
              `${followDate || new Date().toISOString().slice(0, 10)}T${followTime || "00:00"}`
            ).toISOString()
          : null,
    };

    try {
      const res = await fetch(`/emp-api/leads/${numericLeadId}/activities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Always attempt to parse JSON safely
      const text = await res.text();
      let json;
      try {
        json = text ? JSON.parse(text) : { ok: false, error: "Empty response" };
      } catch (e) {
        console.error("Failed to parse JSON from activities POST:", text);
        alert("Server error while saving");
        return;
      }

      if (!json.ok) {
        alert(json.error || "Failed to save actions");
        return;
      }

      const { updatedLead, activity } = json.data;
      if (updatedLead) {
        setLead((prev) => ({
          ...prev,        
          ...updatedLead,

          nextFollowup: payload.nextFollowup
            ? new Date(payload.nextFollowup).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            : "Not set",
        }));
      }
      if (activity) appendActivityLocally(activity);
      setNote("");

      // ---------- NEW: show inline success message ----------
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setSaveSuccess(true);
      timerRef.current = setTimeout(() => {
        setSaveSuccess(false);
        timerRef.current = null;
      }, 3000);
      // ----------------------------------------------------
    } catch (err) {
      console.error("Save actions error:", err);
      alert("Server error while saving");
    }
  }

  // -------------------------
  // Call & WhatsApp (open external, log local)
  // -------------------------
  async function handleCallClick() {
    if (!lead) return;

    // Open dialer
    if (typeof window !== "undefined") {
      window.location.href = `tel:${lead.phone}`;
    }

    // Save call in DB
    try {
      const res = await fetch(`/emp-api/leads/${numericLeadId}/call`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: lead.phone,
        }),
      });

      const json = await res.json();
      if (json.ok && json.data.activity) {
        appendActivityLocally(json.data.activity);
      } else {
        // fallback local log if backend didn't return activity
        appendActivityLocally({
          id: Date.now().toString(),
          activityType: "call",
          title: "Call Initiated",
          description: `Called ${lead.phone}`,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Call log error:", err);
      // optimistic local fallback
      appendActivityLocally({
        id: Date.now().toString(),
        activityType: "call",
        title: "Call Initiated",
        description: `Called ${lead.phone}`,
        createdAt: new Date().toISOString(),
      });
    }
  }

  async function handleSendWhatsApp() {
    if (!lead) return;

    const message = `Hi ${lead.fullName}, this is from Dandes Academy...`;
    const encodedMessage = encodeURIComponent(message);
    const phone = `91${lead.phone}`;

    // Try opening WhatsApp App (works on mobile)
    const appUrl = `whatsapp://send?phone=${phone}&text=${encodedMessage}`;

    // Fallback to WhatsApp Web (desktop browsers)
    const webUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    if (typeof window !== "undefined") {
      // Attempt app first
      window.location.href = appUrl;

      // Desktop fallback
      setTimeout(() => {
        window.open(webUrl, "_blank");
      }, 1000);
    }

    // Save WhatsApp activity in DB
    try {
      const res = await fetch(`/emp-api/leads/${numericLeadId}/whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: lead.phone }),
      });

      const json = await res.json();
      if (json.ok && json.data.activity) {
        appendActivityLocally(json.data.activity);
      }
    } catch (err) {
      console.error("WhatsApp log error:", err);
    }
  }


  // -------------------------
  // Email attachment upload (restored original)
  // -------------------------
  async function handleAttachmentChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachment(file);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/emp-api/uploads/syllabus-docs", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      
      if (json.ok) {
        setAttachmentUrl(json.fileUrl || json.url || null);
        
        setAttachment(file);
      } else {
        console.error("Upload failed:", json);
      }
    } catch (err) {
      console.error("Upload error", err);
    }
  }

  // -------------------------
  // Email send (restored original)
  // -------------------------
  async function handleSendEmail() {
    if (!lead) return;

    // Immediately close the modal
    setShowEmailModal(false);

    // Optimistic timeline activity (optional)
    appendActivityLocally({
      id: Date.now().toString(),
      activityType: "email",
      title: "Email Scheduled",
      description: `Email is being sent to ${lead.email}...`,
      createdAt: new Date().toISOString(),
    });

    // Fire-and-forget (async, non-blocking)
    fetch(`/emp-api/leads/${numericLeadId}/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: emailSubject,
        bodyHtml: editorRef.current?.innerHTML || "",
        attachmentUrl: attachmentUrl || null,
        attachmentName: attachment?.name || null,
      }),
    })
      .then(async (res) => {
        const text = await res.text();
        let json;

        try {
          json = JSON.parse(text);
        } catch {
          console.error("Email API returned non-JSON:", text);
          return;
        }

        if (!json.ok) {
          console.error("Email failed:", json.error);
          return;
        }

        // Replace optimistic activity with real one
        appendActivityLocally(json.data.activity);
      })
      .catch((err) => {
        console.error("Email error:", err);
      });
  }

  function getTypeBadgeClasses(type) {
    switch (type) {
      case "call":
        return "bg-emerald-100 text-emerald-700";
      case "email":
        return "bg-sky-100 text-sky-700";
      case "whatsapp":
        return "bg-green-100 text-green-700";
      case "note":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  }

  // Loading UI
  if (loading || !lead) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading lead...
      </div>
    );
  }

  // -------------------------
  // UI (manager's layout preserved)
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-[15px]">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link
              href="/myhome/leads"
              className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium hover:bg-slate-100 hover:text-slate-800 transition"
            >
              ← Back to Leads
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">Lead #{lead.leadId}</span>
          </div>

          <span className="text-xs text-slate-500">
            ID:&nbsp;
            <span className="font-mono bg-slate-100 px-2 py-1 rounded-md">{lead.leadId}</span>
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left (2/3) */}
          <div className="space-y-5 lg:col-span-2">
            {/* Lead Details */}
            <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900">
                    {lead.fullName}
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Interested in{" "}
                    <span className="font-semibold text-slate-900">{courseName || "-"}</span>

                  </p>

                  {/* tags */}
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => removeTag(t)}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition"
                        title="Click to remove tag"
                      >
                        <span>#{t}</span>
                        <span className="text-[10px]">✕</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                <span className="text-xs rounded-full bg-blue-100 text-blue-700 px-4 py-1.5 font-semibold shadow-sm">
                  {lead.leadStatus}
                </span>

                {lead.nextFollowup && lead.nextFollowup !== "Not set" && (
                  <div className="mt-5 inline-block min-w-[150px] rounded-xl bg-blue-100 text-blue-900 px-5 py-2 shadow-sm">
                    <p className="text-[11px] uppercase tracking-wide font-semibold">
                      Upcoming Follow-up
                    </p>
                    <p className="text-sm font-bold mt-1">
                      {lead.nextFollowup}
                    </p>
                  </div>
                )}
              </div>

                
              </div>

              {/* Contact buttons */}
              <div className="mt-5 flex gap-3 flex-wrap">
                <button type="button" onClick={handleCallClick} className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition">
                  📞 Call
                </button>

                <button type="button" onClick={handleSendWhatsApp} className="inline-flex items-center gap-1 rounded-full bg-green-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-green-700 transition">
                  💬 WhatsApp
                </button>

                <button type="button" onClick={() => setShowEmailModal(true)} className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-sky-700 transition">
                  ✉️ Email
                </button>

              </div>

              

              {/* info grid */}
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <Field label="Email" value={lead.email} />
                <Field label="Phone" value={lead.phone} />
                <Field label="Source" value={lead.leadOwner} />
                <Field label="Created At" value={format12Hour(lead.createdAt)} />
              </div>

              {/* Course & Enrollment Summary Card */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm">
                <p className="text-sm font-semibold text-slate-800 mb-2">
                  Courses & Enrollment Status
                </p>

                <div className="space-y-2">
                  {lead.courses && lead.courses.length > 0 ? (
                    lead.courses.map((c, idx) => {
                      const isEnrolled = c.enrollmentStatus === "Enrolled";

                      return (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg bg-white px-3 py-2 border"
                        >
                          {/* Left: Course + Status */}
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-900">
                              {c.courseInterested || "-"}
                            </span>

                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                isEnrolled
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {c.enrollmentStatus || "Not Enrolled"}
                            </span>
                          </div>

                          {/* Right: Proceed Button */}
                          {isEnrolled ? (
                            <span className="text-xs text-slate-400 font-semibold cursor-not-allowed">
                              Enrolled
                            </span>
                          ) : (
                            <Link
                              href={`/myhome/enrollments/enrollment-form?leadId=${lead.leadId}
                              &leadCourseId=${c.id}
                              &name=${encodeURIComponent(lead.fullName || "")}
                              &email=${encodeURIComponent(lead.email || "")}
                              &phone=${encodeURIComponent(lead.phone || "")}
                              &course=${encodeURIComponent(c.courseInterested || "")}`}
                              className="inline-block bg-blue-600 text-white px-3 py-1.5 text-xs rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                            >
                              Proceed For Enrollment →
                            </Link>
                          )}
                        </div>
                      );
                    })
                  ) : (
                      <p className="text-sm text-slate-500">No courses added</p>
                  )}
                </div>
              </div>

              <Link
                href={`/myhome/leads/add-lead?fullName=${encodeURIComponent(
                  lead.fullName || ""
                )}&email=${encodeURIComponent(lead.email || "")}&phone=${encodeURIComponent(
                  lead.phone || ""
                )}`}
                className="mt-3 inline-block w-fit rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-indigo-700 transition"
              >
                + Interested in Another Course
              </Link>


              {/* add tag */}
              <div className="mt-5 flex gap-2">
                <input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add #tag (e.g., HotLead, DemoBooked)" className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
                <button onClick={addTag} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black transition">
                  Add Tag
                </button>
              </div>
            </div>

    
            {/* Timeline */}
            <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Activity Timeline</h2>

              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500" />
                      {idx !== timeline.length - 1 && <span className="bg-slate-200 h-full w-px" />}
                    </div>

                    <div className="flex-1 bg-white px-4 py-3 rounded-xl border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <span className={"text-[11px] px-2 py-0.5 rounded-full font-medium capitalize " + getTypeBadgeClasses(item.activityType)}>{item.activityType}</span>
                      </div>

                      <p className="text-xs mt-1 text-slate-700">{item.description}</p>
                      <div className="flex justify-between text-[11px] text-slate-400 mt-2">
                        <span>{item.leadOwner || "System"}</span>
                        <span>{format12Hour(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right summary */}
          <div className="space-y-4">

          {/* Quick Actions */}
          <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>

              <div className="grid md:grid-cols-1 gap-4">
                <div className="space-y-4">
               
                  {/* Lead status uses string options */}
                  <ActionSelect label="Lead Status" value={status} onChange={setStatus} options={statusOptions} />

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Next Follow-up</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" value={followDate} onChange={(e) => setFollowDate(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-2 text-sm" />
                      <input type="time" value={followTime} onChange={(e) => setFollowTime(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm" />
                    </div>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-sm font-medium text-slate-700">Add Internal Note</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Call summary, objections, next steps..." className="mt-2 h-32 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none" />
                  </div>

                </div>
              </div>

              <div className="mt-5 ">
                <button onClick={handleSaveActions} className="rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition">Save Actions</button>
              </div>

              {/* NEW: inline success message */}
              {saveSuccess && (
                <div className="mt-3">
                  <p className="text-green-600 text-sm font-semibold">✔ Lead updated successfully</p>
                </div>
              )}
            </div>

            
          </div>
        </div>
      </div>

      {/* Email modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl border border-slate-200">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-900">Compose Email to {lead.fullName}</h2>
              <button type="button" onClick={() => setShowEmailModal(false)} className="text-xs text-slate-500 hover:text-slate-700">✕ Close</button>
            </div>

            <div className="mb-3">
              <label className="text-sm font-medium text-slate-700">Subject</label>
              <input value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            </div>

            <div className="mb-2 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
              <button type="button" onClick={() => applyFormat("bold")} className="border border-slate-300 px-2 py-1 text-xs font-semibold">B</button>
              <button type="button" onClick={() => applyFormat("italic")} className="border border-slate-300 px-2 py-1 text-xs">I</button>
              <button type="button" onClick={() => applyFormat("underline")} className="border border-slate-300 px-2 py-1 text-xs">U</button>
              <button type="button" onClick={() => applyFormat("insertUnorderedList")} className="border border-slate-300 px-2 py-1 text-xs">• List</button>

              <label className="ml-3 text-xs text-slate-600">Attach file</label>
              <input type="file" onChange={handleAttachmentChange} className="ml-2 text-xs" />
            </div>

            <div
              ref={editorRef}
              className="mt-1 min-h-[180px] w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              contentEditable
              suppressContentEditableWarning
            />


            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                {attachment && (
                  <>
                    <span>Attachment: {attachment.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveAttachment}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold"
                    >
                      ✕ Remove
                    </button>
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={handleSendEmail}
                className="bg-sky-600 px-5 py-2 rounded-full text-sm text-white"
              >
                Send Email
              </button>
            </div>


          </div>
        </div>
      )}
    </div>
  );
}

/* ActionSelect - supports string options (status) and object options (assignedTo) */
function ActionSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>

      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
      >
        {Array.isArray(options) && options.map((opt, idx) => {
          // if string option
          if (typeof opt === "string") {
            return <option key={`s-${idx}`} value={opt}>{opt}</option>;
          }
          // object option { id, name }
          return <option key={`u-${opt.id ?? `idx-${idx}`}`} value={opt.id ?? ""}>{opt.name}</option>;
        })}
      </select>
    </div>
  );
}

/* Field component */
function Field({ label, value }) {
  return (
    <div>
      <p className="text-[12px] text-slate-500 font-medium">{label}</p>
      <p className="mt-0.5 text-sm text-slate-900">{value ?? "-"}</p>
    </div>
  );
}
