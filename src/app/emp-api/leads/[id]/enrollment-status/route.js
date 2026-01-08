import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, context) {
  try {
    // ⬅ MUST unwrap params Promise in Next.js 16+
    const { id } = await context.params;
    const leadId = Number(id);

    if (isNaN(leadId)) {
      return NextResponse.json({
        ok: false,
        enrolled: false,
        studentId: null,
        error: "Invalid lead ID"
      });
    }

    const student = await prisma.dastudents.findFirst({
      where: { leadId },
      select: {
        enrollmentNumber: true,
      }
      
    });

    if (!student) {
      return NextResponse.json({
        ok: true,
        enrolled: false,
      
      });
    }

    return NextResponse.json({
      ok: true,
      enrolled: true,
      studentId: student.enrollmentNumber,
    });

  } catch (err) {
    console.error("Enrollment status API error:", err);
    return NextResponse.json({
      ok: false,
      enrolled: false,
      studentId: null,
    });
  }
}
