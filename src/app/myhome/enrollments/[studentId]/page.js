"use client";

import { useEffect, useState } from "react";
import Card from "@/components/enrollment/Card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRef } from "react";



export default function StudentDetailsPage() {
  const installmentMailSentRef = useRef(false);
  const expectedInstallmentCountRef = useRef(null);
  const balanceInstallmentCreated = useRef(false);
  const autoInstallmentDoneRef = useRef(false);
  const autoCreatedInstallmentNoRef = useRef(null);



  const params = useParams();
  const studentId = params?.studentId;

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [sendMailAfterReload, setSendMailAfterReload] = useState(false);



  // Payment Popup
  const [showPayment, setShowPayment] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amountPaid: "",
    paidDate: "",
    paymentMode: "Cash",
  });
  const [savingPayment, setSavingPayment] = useState(false);

  // Load student details
  async function load() {
    try {
      const res = await fetch("/enrollment-api/enrollments");
      const body = await res.json();

      if (!body.ok) {
        setError("Failed to load student");
        return;
      }

      const found = body.data.find(
        (s) => String(s.studentId) === String(studentId)
      );

      if (!found) {
        setStudent(null);
      } else {
        setStudent({
          ...found,          
          ...found.student, 
          feeinstallments: found.feeInstallments || [],
          feepayments: found.feePayments || [],
        });

      
      }


    } catch (err) {
      console.error(err);
      setError("Server error");
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
    window.addEventListener("refresh-enrollments", load);
    return () => window.removeEventListener("refresh-enrollments", load);
  }, []);

  // Open payment popup
  function openPaymentPopup(installment) {
    setSelectedInstallment(installment);

    const alreadyPaid = student.feepayments
      ?.filter(p => p.installmentNo === installment.installmentNo)
      .reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);

    setPaymentForm({
      amountPaid: Number(installment.amount),
      paidDate: new Date().toISOString().slice(0, 10),
      paymentMode: "Cash",
    });

    setShowPayment(true);
  }
 

  // Submit payment
  async function submitPayment() {

    installmentMailSentRef.current = false;
    autoInstallmentDoneRef.current = true;

    expectedInstallmentCountRef.current = student.feeinstallments.length;

    setSavingPayment(true);

    const payload = {
      studentId: studentId,
      installmentNo: selectedInstallment.installmentNo,
      amountPaid: Number(paymentForm.amountPaid),
      paidDate: paymentForm.paidDate,
      paymentMode: paymentForm.paymentMode,
    };

    const res = await fetch("/enrollment-api/make-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const body = await res.json();

    if (body.ok) {
      setShowPayment(false);

      // ✅ Case-1 only (no auto-installment)
      if (!balanceInstallmentCreated.current) {
        setSendMailAfterReload(true);
      }

      load();
    }

    setSavingPayment(false);
  }

  // Calculate totals
  const totalPaid =
    student?.feepayments?.reduce(
      (sum, p) => sum + Number(p.amountPaid || 0),
      0
    ) || 0;

  const feeBalance = Number(student?.totalFee || 0) - totalPaid;

  // 🔹 AUTO-CREATE BALANCE INSTALLMENT (FINAL & SAFE)
  useEffect(() => {
    if (!student) return;
    if (balanceInstallmentCreated.current) return;

    const installments = student.feeinstallments || [];

    // 1️⃣ All installments must be PAID
    const allPaid =
      installments.length > 0 &&
      installments.every((i) => i.status === "Paid");

    // 2️⃣ Balance must exist
    if (!allPaid || feeBalance <= 0) {
      autoInstallmentDoneRef.current = true;
      expectedInstallmentCountRef.current = student.feeinstallments.length;
      return;
    }

    // 3️⃣ Determine next installment number
    const lastInstallment =
      installments[installments.length - 1];

    const nextInstallmentNo =
      Number(lastInstallment.installmentNo) + 1;

    // 4️⃣ Due date = +1 month from last installment
    const nextDueDate = new Date(lastInstallment.dueDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);

    balanceInstallmentCreated.current = true;

    // 5️⃣ Call backend to create installment
    fetch("/enrollment-api/create-installment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        installmentNo: nextInstallmentNo,
        amount: feeBalance,
        dueDate: nextDueDate.toISOString().split("T")[0],
      }),
    })
      .then(() => {
        autoInstallmentDoneRef.current = true;
        autoCreatedInstallmentNoRef.current = nextInstallmentNo;
        setSendMailAfterReload(true);
        load();
      })
      .catch((err) => {
        console.error("Auto-create installment failed", err);
      });

  }, [student, feeBalance, studentId]);



  useEffect(() => {

    if (!sendMailAfterReload) return;
    if (!student) return;

    if (
      !autoInstallmentDoneRef.current &&
      autoCreatedInstallmentNoRef.current !== null
    ) {
      return;
    }


    if (
      expectedInstallmentCountRef.current !== null &&
      student.feeinstallments.length < expectedInstallmentCountRef.current
    ) {
      return;
    }

    if (installmentMailSentRef.current) return;
    installmentMailSentRef.current = true;

    const paidInstallmentNo =
      autoCreatedInstallmentNoRef.current ??
      selectedInstallment?.installmentNo;

    if (!paidInstallmentNo) return;

    fetch("/enrollment-api/send-installment-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId,
        paidInstallmentNo,

      }),
    })
      .then(() => {
        setSendMailAfterReload(false);
        expectedInstallmentCountRef.current = null;
        autoCreatedInstallmentNoRef.current = null;
      })
      .catch(console.error);

  }, [student, sendMailAfterReload]);

  
  if (loading) {
    return <Card title="Loading...">Loading details...</Card>;
  }

  if (error || !student) {
    return (
      <Card title="Error">
        <div className="text-red-600">{error || "Student not found"}</div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* ============ PAYMENT POPUP ============ */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              Make Payment — Installment {selectedInstallment.installmentNo}
            </h3>

            {/* Amount */}
            <label className="text-sm">Amount Paid</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded mb-3"
              value={paymentForm.amountPaid}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, amountPaid: e.target.value })
              }
            />

            {/* Paid Date */}
            <label className="text-sm">Paid Date</label>
            <input
              type="date"
              className="w-full border px-2 py-1 rounded mb-3"
              value={paymentForm.paidDate}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, paidDate: e.target.value })
              }
            />

            {/* Mode */}
            <label className="text-sm">Payment Mode</label>
            <select
              className="w-full border px-2 py-1 rounded mb-4"
              value={paymentForm.paymentMode}
              onChange={(e) =>
                setPaymentForm({ ...paymentForm, paymentMode: e.target.value })
              }
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Internet Banking">Internet Banking</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPayment(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={submitPayment}
                disabled={savingPayment}
                className="px-4 py-1 bg-green-600 text-white rounded"
              >
                {savingPayment ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============ HEADER ============ */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Student Details — {student.studentId}
        </h2>

        <Link href="/myhome/enrollments" className="text-blue-600 text-sm">
          ← Back
        </Link>
      </div>

      {/* ============ BASIC INFO ============ */}
      <Card
        title={
          <div className="flex justify-between items-center">
            <span>Basic Info</span>

            
            {student.enrollmentNumber && (
              <div className="text-sm">
                <span className="font-extrabold text-black">
                  Enrollment Number :
                </span>{" "}
                <span className="font-bold text-red-600">
                  {student.enrollmentNumber}
                </span>
              </div>
            )}
          </div>
        }
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Student ID" value={student.studentId} />
          <Info label="Lead ID" value={student.leadId || "-"} />
          <Info label="Full Name" value={student.fullName} />
          <Info label="Email" value={student.email || "-"} />
          <Info label="Phone" value={student.phone || "-"} />
          <Info label="Course Joined" value={student.courseJoined || "-"} />
          <Info label="Total Fee" value={Number(student.totalFee).toLocaleString()} />

          <Info label="Fee Paid" value={totalPaid.toLocaleString()} />
          <Info label="Fee Balance" value={feeBalance.toLocaleString()} />

          <Info label="Installments" value={student.feeinstallments?.length || 0} />
          <Info label="Status" value={student.status} />

          <Info
            label="Created"
            value={new Date(student.createdAt).toLocaleString()}
          />
        </div>
      </Card>

      {/* ============ INSTALLMENT SCHEDULE ============ */}
      <Card title="Installment Schedule">

        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="px-4 py-2">Inst. No</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Due Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {student.feeinstallments?.map((it, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3 text-center">{it.installmentNo}</td>
                <td className="px-4 py-3 text-center">
                  {Number(it.amount || 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  {new Date(it.dueDate).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${
                      it.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {it.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  {it.status === "Paid" ? (
                    <span className="text-gray-400 text-xs">Completed</span>
                  ) : (
                    <button
                      onClick={() => openPaymentPopup(it)}
                      className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      Make Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      
      {/* ============ PAYMENT HISTORY ============ */}
      {student.feepayments && student.feepayments.length > 0 && (
        <Card title="Payment History">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-4 py-2">Inst. No</th>
                <th className="px-4 py-2">Amount Paid</th>
                <th className="px-4 py-2">Paid Date</th>
                <th className="px-4 py-2">Payment Mode</th>
              </tr>
            </thead>

            <tbody>
              {student.feepayments.map((p, index) => (
                <tr key={index} className="border-t">

                  {/* Inst No */}
                  <td className="px-4 py-3 text-center">
                    {p.installmentNo}
                  </td>
                  
                  {/* Amount Paid */}
                  <td className="px-4 py-3 text-center font-semibold">
                    {Number(p.amountPaid || 0).toLocaleString()}
                  </td>

                  {/* Paid Date */}
                  <td className="px-4 py-3 text-center">
                    {new Date(p.paidDate).toLocaleDateString()}
                  </td>
                  
                  {/* Payment Mode */}
                  <td className="px-4 py-3 text-center">
                    {p.paymentMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      
      
    </div>
  );
}

/* Small helper component */
function Info({ label, value }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
