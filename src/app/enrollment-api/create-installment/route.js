import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { studentId, installmentNo, amount, dueDate } = body;

    if (!studentId || !installmentNo || !amount || !dueDate) {
      return NextResponse.json(
        { ok: false, error: "Invalid data" },
        { status: 400 }
      );
    }

    // 🔹 1. Find course (required)
    const courseRow = await prisma.daStudents_Course.findUnique({
      where: { studentId },
      select: { id: true },
    });

    if (!courseRow) {
      return NextResponse.json(
        { ok: false, error: "Course not found" },
        { status: 404 }
      );
    }

    const courseId = courseRow.id;

    // 🔹 2. Check unpaid installment (same logic, correct type)
    const unpaidInstallment = await prisma.feeInstallments.findFirst({
      where: {
        courseId,
        status: "Unpaid",
      },
    });

    if (unpaidInstallment) {
      return NextResponse.json(
        { ok: false, error: "Unpaid installment already exists" },
        { status: 400 }
      );
    }

    // 🔹 3. Create installment
    await prisma.feeInstallments.create({
      data: {
        installmentNo,
        amount,
        dueDate: new Date(dueDate),
        status: "Unpaid",
        courseId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Create installment error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
