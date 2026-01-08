"use client";

import { useState } from "react";

export default function UploadLeadsPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [errorRows, setErrorRows] = useState([]);
  const [successCount, setSuccessCount] = useState(0);

  const [recordCount, setRecordCount] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleFileSelect(e) {
    const selected = e.target.files[0];
    setFile(selected);

    if (!selected) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.trim().split("\n");
      const count = lines.length - 1;

      setRecordCount(count);
    };

    reader.readAsText(selected);
  }

  async function handleUpload() {
    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    setUploading(true);
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    setProgress(30);

    const res = await fetch("/emp-api/upload-leads", {
      method: "POST",
      body: formData,
    });

    setProgress(70);

    const data = await res.json();

    setSuccessCount(data.successCount || 0);
    setErrorRows(data.errors || []);
    setResult(true);

    setProgress(100);

    setTimeout(() => {
      setUploading(false);
      setProgress(0);
    }, 800);
  }

  function downloadSampleCSV() {
    const sample =
      "full_Name,email,phone,course_Interested,Remarks\n" +
      "Rahul Sharma,rahul@example.com,+91 9876543210,AI/ML Course,Interested in weekend batch\n" +
      "Priya Verma,priya@example.com,+1 5551231234,System Design Course,Requested callback\n";


    const blob = new Blob([sample], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-leads.csv";
    a.click();
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Upload Leads</h1>

      <button
        onClick={downloadSampleCSV}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download Sample CSV
      </button>

      {/* Upload Box */}
      <div className="border p-4 rounded bg-gray-50">
        <div
          onClick={() => document.getElementById("csvInput").click()}
          className="mb-3 cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-[#AD1612] transition-all hover:bg-red-50"
        >
          <p className="text-gray-600 text-sm">
            {file ? (
              <span className="font-medium text-green-700">{file.name}</span>
            ) : (
              "Click here to choose CSV file"
            )}
          </p>
        </div>

        {/* Hidden Input */}
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        {recordCount > 0 && (
          <p className="text-blue-700 text-sm font-medium mb-3">
            Total Records Found: {recordCount}
          </p>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 rounded text-white ${
            uploading ? "bg-gray-400" : "bg-[#AD1612] hover:bg-[#92100E]"
          }`}
        >
          {uploading ? "Uploading..." : "Upload Leads"}
        </button>

        {uploading && (
          <div className="mt-4 w-full bg-gray-300 rounded h-3 overflow-hidden">
            <div
              className="bg-green-600 h-3 transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Results */}
      {result && !uploading && (
        <div className="mt-6">
          <p className="text-green-600 text-lg font-medium">
            Successfully added: {successCount}
          </p>

          {errorRows.length > 0 && (
            <div className="mt-4">
              <p className="text-red-600 font-medium">Errors:</p>

              <table className="mt-2 w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-1">Row</th>
                    <th className="border px-2 py-1">Reason</th>
                    <th className="border px-2 py-1">Duplicate Field</th>
                    <th className="border px-2 py-1">Value</th>
                  </tr>
                </thead>

                <tbody>
                  {errorRows.map((err, i) => (
                    <tr key={i}>
                      <td className="border px-2 py-1">{err.row}</td>
                      <td className="border px-2 py-1">{err.reason}</td>
                      <td className="border px-2 py-1">
                        {err.duplicateField || "-"}
                      </td>
                      <td className="border px-2 py-1">
                        {err.value || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
