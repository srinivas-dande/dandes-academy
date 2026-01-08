import prisma from "@/lib/prisma";

export async function getFilteredLeads(filters) {
  const {
    courseInterested,
    leadOwner,
    leadStatus,
    from,
    to
  } = filters;


  const where = {};

  // ✅ Course filter (relation)
  if (courseInterested) {
    where.courses = {
      some: {
        courseInterested,
      },
    };
  }

  // ✅ Source filter
  if (leadOwner) {
    where.leadOwner = leadOwner;
  }

  // ✅ Status filter
  if (leadStatus) {
   where.leadStatus = leadStatus;
  }


  // ✅ Date range (unchanged logic)
  if (from && to) {
    where.createdAt = {
      gte: new Date(from),
      lte: new Date(to),
    };
  }

  try {
    const leads = await prisma.daleads.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return { ok: true, leads };
  } catch (err) {
    console.error("❌ Error fetching leads:", err);
    return { ok: false, error: "Failed to fetch leads" };
  }
}
