import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const doc = await prisma.defaultSyllabus.findUnique({
      where: { id: 1 },
    });

    if (!doc) {
      return NextResponse.json({ ok: true, fileName: null, fileUrl: null });
    }

    return NextResponse.json({
      ok: true,
      fileName: doc.fileName,
      fileUrl: doc.fileUrl,
      updatedAt: doc.updatedAt,
    });
  } catch (e) {
    console.error("INFO LOAD ERROR:", e);
    return NextResponse.json({ ok: false, error: "Failed to load" });
  }
}
