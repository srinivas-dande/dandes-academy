import prisma from "@/lib/prisma";

// ------------------------------
// ADD TAG SERVICE
// ------------------------------
export async function addTagService(leadId, tag, createdById, leadOwner) {
  if (!tag || !tag.trim()) return { error: "Tag is required" };

  const lead = await prisma.daleads.findUnique({
    where: { leadId: leadId },
    select: { leadId: true },
  });

  if (!lead) return { error: "Lead not found" };

  const cleanTag = tag.trim();

  // ✅ LeadTag → KEEP createdById (NO CHANGE)
  const record = await prisma.leadTag.create({
    data: {
      tag: cleanTag,
      leadId: lead.leadId,
      createdById: createdById || null,
    },
  });

  // ✅ LeadActivity → USE leadOwner (FIX)
  await prisma.leadActivity.create({
    data: {
      leadId: lead.leadId,
      activityType: "tag_added",
      title: "Tag Added",
      description: `Added tag: ${cleanTag}`,
      leadOwner: leadOwner || null,
    },
  });

  return { data: record };
}

// ------------------------------
// REMOVE TAG SERVICE
// ------------------------------
export async function removeTagService(leadId, tag, createdById, leadOwner) {
  if (!tag || !tag.trim()) return { error: "Tag is required" };

  const cleanTag = tag.trim();

  // ✅ LeadTag → KEEP createdById
  await prisma.leadTag.deleteMany({
    where: { leadId, tag: cleanTag },
  });

  // ✅ LeadActivity → USE leadOwner
  await prisma.leadActivity.create({
    data: {
      leadId,
      activityType: "tag_removed",
      title: "Tag Removed",
      description: `Removed tag: ${cleanTag}`,
      leadOwner: leadOwner || null,
    },
  });

  return { data: true };
}
