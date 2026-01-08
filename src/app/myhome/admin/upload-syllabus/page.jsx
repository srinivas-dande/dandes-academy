"use client";

import { useEffect, useState } from "react";
import Card from "@/components/emp/Card";

export default function UploadSyllabusPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [defaultFile, setDefaultFile] = useState(null);
  const [defaultUrl, setDefaultUrl] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Load existing default syllabus info
  useEffect(() => {
    async function loadDefault() {
      try {
        const res = await fetch("/emp-api/uploads/syllabus-info");
        const json = await res.json();

        if (json.ok) {
          setDefaultFile(json.fileName);
          setDefaultUrl(json.fileUrl);
          setUpdatedAt(json.updatedAt);
        }
      } catch (err) {
        console.error("LOAD DEFAULT ERROR:", err);
      }
    }
    loadDefault();
  }, []);

  // File Validation
  function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;

    if (f.type !== "application/pdf") {
      setMsg("❌ Only PDF files are allowed.");
      setFile(null);
      return;
    }

    if (f.size > 10 * 1024 * 1024) {
      setMsg("❌ File size exceeds 10MB.");
      setFile(null);
      return;
    }

    setFile(f);
    setMsg("");
  }

  // Upload PDF
  async function handleUpload(e) {
    e.preventDefault();
    setMsg("");

    if (!file) {
      return setMsg("⚠ Please select a valid PDF file.");
    }

    const form = new FormData();
    form.append("file", file);
    if (title?.trim()) form.append("title", title);

    setUploading(true);

    const res = await fetch("/emp-api/uploads/syllabus-docs", {
      method: "POST",
      body: form,
    });

    setUploading(false);

    const json = await res.json();
    if (!json.ok) {
      return setMsg("❌ Upload failed!");
    }

    setMsg("✅ Syllabus uploaded successfully");

    // Update UI with new file values
    setDefaultFile(json.fileName);
    setDefaultUrl(json.fileUrl);
    setUpdatedAt(json.updatedAt);

    // Reset
    setFile(null);
    setTitle("");
  }

  return (
    <Card title="Upload New Syllabus" className="max-w-3xl mx-auto">
      <form onSubmit={handleUpload} className="space-y-6">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Title (optional)</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Java Study Guide – Module 9"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Select PDF File</label>

          <div className="flex items-center gap-3">
            <label
              htmlFor="pdfUpload"
              className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm border border-gray-300 transition"
            >
              Choose File
            </label>

            <span className="text-sm text-gray-600">
              {file ? file.name : "No file chosen"}
            </span>
          </div>

          <input
            id="pdfUpload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={!file || uploading}
          className={`px-6 py-2 rounded-lg text-sm text-white transition
            ${
              !file || uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#AD1612] hover:bg-[#8E1310]"
            }
          `}
        >
          {uploading ? "Uploading..." : "Upload & Replace Default"}
        </button>

        {msg && <p className="text-sm font-medium mt-2">{msg}</p>}

        {/* Current Default File */}
        <div className="mt-8 p-4 bg-gray-50 rounded-xl border">
          <p className="text-sm font-semibold">Current Default Syllabus:</p>

          {defaultFile ? (
            <div className="mt-1">
              <p className="text-sm">📄 <b>{defaultFile}</b></p>

              {defaultUrl && (
                <a
                  href={defaultUrl}
                  target="_blank"
                  className="text-blue-600 underline text-xs"
                >
                  View PDF
                </a>
              )}

              {updatedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Updated: {new Date(updatedAt).toLocaleString()}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No default syllabus uploaded yet.</p>
          )}
        </div>
      </form>
    </Card>
  );
}
