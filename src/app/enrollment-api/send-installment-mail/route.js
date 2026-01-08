import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { buildInstallmentPaidMail } from "@/lib/mail/sendLeadEmails";
import { transporter } from "@/lib/mail/transporter";

export async function POST(req) {
  try {
    const body = await req.json();
    const studentId = String(body.studentId);
    const paidInstallmentNo = Number(body.paidInstallmentNo);

    if (!studentId) {
      return NextResponse.json(
        { ok: false, error: "studentId is required" },
        { status: 400 }
      );
    }

    // ✅ ADDED: validate paidInstallmentNo (NO LOGIC CHANGE)
    if (!paidInstallmentNo) {
      return NextResponse.json(
        { ok: false, error: "paidInstallmentNo is required" },
        { status: 400 }
      );
    }

    /* =================================================
       📧 SEND INSTALLMENT EMAIL (FINAL STATE)
       ================================================= */

    // 1️⃣ Fetch FULL & FRESH course + student + installments
    const courseWithDetails = await prisma.daStudents_Course.findUnique({
      where: { studentId },
      include: {
        student: true,
        feeInstallments: {
          orderBy: { installmentNo: "asc" },
        },
        feePayments: {
          orderBy: { paidDate: "desc" },
        },
      },
    });

    if (!courseWithDetails) {
      return NextResponse.json(
        { ok: false, error: "Enrollment not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Ensure email exists
    if (!courseWithDetails.student?.email) {
      return NextResponse.json(
        { ok: false, error: "Student email not found" },
        { status: 400 }
      );
    }

    // 3️⃣ Build installment list (UNCHANGED LOGIC)
    const installments = courseWithDetails.feeInstallments.map((inst) => {
      const paymentForInst = courseWithDetails.feePayments.find(
        (p) => p.installmentNo === inst.installmentNo
      );

      return {
        installmentNo: inst.installmentNo,
        amount: inst.amount,
        status: inst.status,
        paidDate:
          inst.status === "Paid" && paymentForInst?.paidDate
            ? new Date(paymentForInst.paidDate).toLocaleDateString("en-IN")
            : "-",
      };
    });

    // 4️⃣ Build mail (UNCHANGED STRUCTURE)
    const mail = buildInstallmentPaidMail({
      fullName: courseWithDetails.student.fullName,
      enrollmentNumber: courseWithDetails.student.enrollmentNumber,
      email: courseWithDetails.student.email,
      phone: courseWithDetails.student.phone,
      course: courseWithDetails.courseJoined,
      studentId: courseWithDetails.studentId,
      totalFee: courseWithDetails.totalFee,
      installmentCount: courseWithDetails.feeInstallments.length,
      installments,
      paidInstallmentNo,
    });

    // 5️⃣ Send mail
    await transporter.sendMail({
     from: '"Dandes Academy" <hello@dandesacademy.com>',
      ...mail,
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("❌ send-installment-mail error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send installment mail" },
      { status: 500 }
    );
  }
}
