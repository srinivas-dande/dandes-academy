import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session"; // ✅ ADDED


export async function logWhatsappService(leadId) {
  if (isNaN(leadId)) return { error: "Invalid Lead ID" };

  // Fetch lead
  const lead = await prisma.daleads.findUnique({
    where: { leadId: leadId },
    select: { leadId: true, phone: true },
  });

  const session = await getSession();
  const leadOwner = session?.fullName || null;

  if (!lead) return { error: "Lead not found" };

  const phone = lead.phone || "unknown number";

  // Create WhatsApp activity
  const activity = await prisma.leadActivity.create({
    data: {
      leadId: lead.leadId,
      activityType: "whatsapp",
      title: "WhatsApp Message Sent",
      description: `Opened WhatsApp chat with ${phone}`,
      leadOwner: leadOwner,
      meta: {
        phone,
      },
    },
  });

  return { data: activity };
}
