// src/lib/mail/sendCustomEmail.js
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";
import { transporter } from "./transporter.js";

export async function sendCustomEmail({ lead, subject, bodyHtml, attachment }) {
  const attachments = [];

  if (attachment && fs.existsSync(attachment.path)) {
    attachments.push({
      filename: attachment.fileName,
      path: attachment.path,
    });
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: lead.email,
    subject,
    html: bodyHtml,
    attachments,
  });

  return { ok: true };
}
