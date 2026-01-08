import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    const role = session?.role;
    const fullName = session?.fullName;

    let where = {};

    // 🔒 Manager sees only own students
    if (role !== "admin") {
      where = {
        student: {
          leadOwner: fullName,
        },
      };
    }

    // ==============================
    // 1️⃣ Fetch courses + students + installments
    // ==============================
    const courses = await prisma.daStudents_Course.findMany({
      where,
      orderBy: {
        student: {
          createdAt: "desc",
        },
      },
      include: {
        student: true,
        feeInstallments: {
          orderBy: { installmentNo: "asc" },
        },
      },
    });

    // ==============================
    // 2️⃣ Fetch payments by courseId
    // ==============================
    const courseIds = courses.map(c => c.id);

    const payments = await prisma.feePayments.findMany({
      where: {
        courseId: {
          in: courseIds,
        },
      },
      orderBy: {
        paidDate: "desc",
      },
    });

    // ==============================
    // 3️⃣ Merge everything
    // ==============================
    const result = courses.map(c => {
      const coursePayments = payments.filter(
        p => p.courseId === c.id
      );

      return {
        // 🔑 identifiers
        enrollmentNumber: c.student.enrollmentNumber,
        studentId: c.studentId,

        // 👤 student
        leadId: c.student.leadId,
        fullName: c.student.fullName,
        email: c.student.email,
        phone: c.student.phone,
        status: c.student.status,
        createdAt: c.student.createdAt,
        leadOwner: c.student.leadOwner,

        // 🎓 course
        courseId: c.id,
        courseJoined: c.courseJoined,
        totalFee: c.totalFee,
        feePaid: c.feePaid,
        feeBalance: c.feeBalance,

        feeInstallments: c.feeInstallments.map(inst => {
          const paidForThisInstallment = coursePayments
            .filter(p => p.installmentNo === inst.installmentNo)
            .reduce((sum, p) => sum + Number(p.amountPaid || 0), 0);

          return {
            ...inst,
            paidAmount: paidForThisInstallment,   
            plannedAmount: inst.amount,    
          };
        }),

        feePayments: coursePayments,
      };
    });

    return NextResponse.json({
      ok: true,
      data: result,
    });

  } catch (err) {
    console.error("GET /enrollment-api/enrollments error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
