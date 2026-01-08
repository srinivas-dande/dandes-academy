import prisma from "@/lib/prisma";

/* ----------------------------------------------------------
   GET ACTIVITIES
-----------------------------------------------------------*/
export async function getActivitiesService(leadId) {
  return await prisma.leadActivity.findMany({
    where: { leadId },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

/* ----------------------------------------------------------
   UPDATE LEAD + CREATE ACTIVITY
-----------------------------------------------------------*/
export async function updateLeadActivityService(leadId, body) {
  // frontend sends: note, leadStatus, nextFollowup
  const { note, leadStatus, nextFollowup } = body;

  const existing = await prisma.daleads.findUnique({
    where: { leadId: leadId },
  });

  if (!existing) return { error: "Lead not found" };

  const changes = [];

  /* -------- STATUS CHANGE -------- */
  if (leadStatus && leadStatus !== existing.leadStatus) {
    changes.push(`Status: ${existing.leadStatus} → ${leadStatus}`);
  }

  /* -------- NEXT FOLLOW-UP -------- */
  let followupDate = null;

  if (nextFollowup) {
    followupDate = new Date(nextFollowup);
    changes.push(
      `Next Follow-up: ${followupDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`
    );
  } else {
    changes.push("Next Follow-up: Not set");
  }

  /* -------- NOTE -------- */
  if (note && note.trim()) {
    changes.push(`Note: ${note.trim()}`);
  }

  if (changes.length === 0) {
    return { error: "No changes to save" };
  }

  const result = await prisma.$transaction(async (tx) => {
    /* -------- UPDATE LEAD (ONLY STATUS) -------- */
    let updatedLead = existing;

    if (leadStatus && leadStatus !== existing.leadStatus) {
      updatedLead = await tx.daleads.update({
        where: { leadId: leadId },
        data: {
          leadStatus,
        },
      });
    }

    /* -------- CREATE ACTIVITY -------- */
    const activity = await tx.leadActivity.create({
      data: {
        leadId,
        activityType: "update",
        title: "Lead Updated",
        description: changes.join(" | "),
        leadOwner: existing.leadOwner || null, // ✅ ALWAYS from Lead table
        nextFollowupAt: followupDate,          // ✅ correct column
        meta: {
          leadStatus,
          nextFollowup,
          note,
        },
      },
    });

    return { updatedLead, activity };
  });

  return { ok: true, data: result };
}
