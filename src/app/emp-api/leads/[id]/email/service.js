import prisma from "@/lib/prisma";
import path from "path";
import fs from "fs";
import { sendCustomEmail } from "@/lib/mail/sendCustomEmail";
import { getSession } from "@/lib/session";

export async function sendEmailService(leadId, payload) {
  const {
    subject,
    bodyHtml,
    attachmentUrl,     // ✅ from frontend
    attachmentName,
    createdById,
  } = payload;

  const lead = await prisma.daleads.findUnique({
    where: { leadId },
  });

  if (!lead) return { ok: false, error: "Lead not found" };

  const session = await getSession();
  const leadOwner = session?.fullName || null;

  let attachment = null;

  // -----------------------------
  // ✅ ATTACHMENT LOGIC (FIXED)
  // -----------------------------
  if (attachmentUrl && attachmentName) {
    const fullPath = path.resolve("public" + attachmentUrl);

    if (fs.existsSync(fullPath)) {
      attachment = {
        fileName: attachmentName,
        path: fullPath,
      };
    }
  }

  // -----------------------------
  // ✅ SEND EMAIL
  // -----------------------------
  await sendCustomEmail({
    lead,
    subject,
    bodyHtml,
    attachment,
  });

  // -----------------------------
  // ✅ SAVE LOGS
  // -----------------------------
  const result = await prisma.$transaction(async (tx) => {
    const email = await tx.leadEmail.create({
      data: {
        leadId,
        toEmail: lead.email,
        fromEmail: '"Dandes Academy" <hello@dandesacademy.com>',
        subject,
        bodyHtml,
        status: "sent",
        fileName: attachment ? attachment.fileName : null,
        fileUrl: attachment ? attachmentUrl : null,
      },
    });

    const activity = await tx.leadActivity.create({
      data: {
        leadId,
        activityType: "email",
        title: "Email Sent",
        description: attachment
          ? `To ${lead.email} | Attached ${attachment.fileName}`
          : `To ${lead.email}`,
        leadOwner: createdById || leadOwner,
      },
    });

    return { email, activity };
  });

  return { ok: true, data: result };
}
