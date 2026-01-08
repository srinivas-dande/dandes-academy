import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json({ ok: false, error: "No file uploaded" });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload folder (real project folder)
    const uploadDir = path.resolve("public/uploads/syllabus");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const newFilePath = path.join(uploadDir, file.name);

    // ✔ Step 1: Remove existing files in the folder
    const existingFiles = fs.readdirSync(uploadDir);
    existingFiles.forEach((f) => {
      const fullPath = path.join(uploadDir, f);
      fs.unlinkSync(fullPath);
    });

    // ✔ Step 2: Save new file (overwrite)
    fs.writeFileSync(newFilePath, buffer);

    const fileUrl = `/uploads/syllabus/${file.name}`;

    // ✔ Step 3: Update DB (REQUIRED FIELDS ADDED)
    const saved = await prisma.defaultSyllabus.upsert({
      where: { id: 1 },
      update: {
        fileName: file.name,
        fileUrl,
        mimeType: file.type || "application/pdf",
        fileSize: buffer.length,
        updatedAt: new Date(),
      },
      create: {
        id: 1,
        fileName: file.name,
        fileUrl,
        mimeType: file.type || "application/pdf",
        fileSize: buffer.length,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      fileName: saved.fileName,
      fileUrl: saved.fileUrl,
      replacedOldFiles: existingFiles,
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ ok: false, error: "Upload failed" });
  }
}
