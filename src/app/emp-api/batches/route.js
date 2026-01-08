import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseName = searchParams.get("courseName");

  // Safety check
  if (!courseName) {
    return NextResponse.json({ ok: true, data: [] });
  }

  try {
    const batches = await prisma.Batches.findMany({
      where: {
        courseName: courseName,     // matches dropdown value
        
      },
      select: {
        batchId: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return NextResponse.json({
      ok: true,
      data: batches,
    });
  } catch (error) {
    console.error("❌ Fetch Batches Error:", error);

    return NextResponse.json(
      { ok: false, error: "Failed to load batches" },
      { status: 500 }
    );
  }
}
