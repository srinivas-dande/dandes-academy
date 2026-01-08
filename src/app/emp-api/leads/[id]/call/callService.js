import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session"; // ✅ ADDED

export async function logCallService(leadId) {
  if (isNaN(leadId)) {
    return { error: "Invalid Lead ID" };
  }

  // ✅ GET LOGGED-IN USER (SESSION)
  const session = await getSession();
  const leadOwner = session?.fullName || null;

  // Fetch lead
  const lead = await prisma.daleads.findUnique({
    where: { leadId: leadId },
    select: { phone: true, leadId: true },
  });

  if (!lead) {
    return { error: "Lead not found" };
  }

  const phone = lead.phone || "unknown number";

  // Create call activity
  const activity = await prisma.leadActivity.create({
    data: {
      leadId: lead.leadId,
      activityType: "call",
      title: "Call Initiated",
      description: `Called +91 ${phone}`,
      leadOwner: leadOwner,
      meta: {
        phone,
      },
    },
  });

  return { data: activity };
}
