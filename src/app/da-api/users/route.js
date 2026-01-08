import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await prisma.employees.findMany({
      select: {
        empId: true,
        fullName: true,
        email: true,
        phone: true,
        designation: true,
        status: true,
        dateOfJoining: true,
      },
      orderBy: {
        fullName: "asc",
      },
    });

    return NextResponse.json({
      ok: true,
      data: employees,
    });

  } catch (err) {
    console.error("Employees API Error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to load employees",
      },
      { status: 500 }
    );
  }
}
