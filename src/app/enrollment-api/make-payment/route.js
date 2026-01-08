import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ frontend sends studentId
    const studentId = String(body.studentId);
    const installmentNo = Number(body.installmentNo);
    const amountPaid = Number(body.amountPaid);
    const paidDate = new Date(body.paidDate);
    const paymentMode = body.paymentMode;

    if (!studentId || !installmentNo || !amountPaid || !paidDate) {
      return NextResponse.json(
        { ok: false, error: "Invalid payment data" },
        { status: 400 }
      );
    }

    // 1️⃣ Get COURSE using studentId
    const courseRow = await prisma.daStudents_Course.findUnique({
      where: { studentId },
      select: {
        id: true,
        totalFee: true,
      },
    });

    if (!courseRow) {
      return NextResponse.json(
        { ok: false, error: "Course not found" },
        { status: 404 }
      );
    }

    const courseId = courseRow.id;

    // 2️⃣ Fetch installment (by courseId)
    const installment = await prisma.feeInstallments.findFirst({
      where: {
        courseId,
        installmentNo,
      },
    });

    if (!installment) {
      return NextResponse.json(
        { ok: false, error: "Installment not found" },
        { status: 404 }
      );
    }

    if (installment.status === "Paid") {
      return NextResponse.json(
        { ok: false, error: "Installment already paid" },
        { status: 400 }
      );
    }

    // 3️⃣ Transaction
    const result = await prisma.$transaction(async (tx) => {

      
      // 1️⃣ Insert payment
      const payment = await tx.feePayments.create({
        data: {
          courseId,
          installmentNo,
          amountPaid,
          paidDate,
          paymentMode,
        },
      });

      // 2️⃣ Total paid for THIS installment
      const instSum = await tx.feePayments.aggregate({
        where: {
          courseId,
          installmentNo,
        },
        _sum: { amountPaid: true },
      });

      const paidForInstallment = Number(instSum._sum.amountPaid || 0);

      // 3️⃣ Fetch current installment
      const currentInstallment = await tx.feeInstallments.findFirst({
        where: { courseId, installmentNo },
      });

      const diff =
        Number(currentInstallment.amount) - paidForInstallment;

        // 4️⃣ Update current installment status
        await tx.feeInstallments.update({
          where: { id: currentInstallment.id },
          data: {
            amount: paidForInstallment, 
            status: "Paid",             
          },
        });

        // 5️⃣ Adjust NEXT installment amount
        if (diff !== 0) {
          const nextInstallment = await tx.feeInstallments.findFirst({
            where: {
              courseId,
              installmentNo: installmentNo + 1,
            },
          });

          if (nextInstallment) {
            await tx.feeInstallments.update({
              where: { id: nextInstallment.id },
              data: {
                amount: Number(nextInstallment.amount) + diff,
              },
            });
          }
        }

        // 6️⃣ Recalculate course totals
        const sumPayments = await tx.feePayments.aggregate({
          where: { courseId },
          _sum: { amountPaid: true },
        });

        const totalPaid = Number(sumPayments._sum.amountPaid || 0);
        const feeBalance =
          Number(courseRow.totalFee || 0) - totalPaid;

        await tx.daStudents_Course.update({
          where: { id: courseId },
          data: {
            feePaid: totalPaid,
            feeBalance,
          },
        });

        return { payment };
      });


    return NextResponse.json({ ok: true, data: result });

    


  } catch (err) {
    console.error("❌ make-payment API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error while saving payment" },
      { status: 500 }
    );
  }
}
