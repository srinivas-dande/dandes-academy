import prisma from "@/lib/prisma";

export async function getLeadFilters() {
  try {
    /* ---------------- COURSES ---------------- */
    const courses = await prisma.daleadsCourse.findMany({
      distinct: ["courseInterested"],
      select: { courseInterested: true },
      where: { courseInterested: { not: null } },
    });

    /* ---------------- SOURCES (leadOwner) ---------------- */
    const sources = await prisma.daleads.findMany({
      distinct: ["leadOwner"],          // ✅ FIX
      select: { leadOwner: true },       // ✅ FIX
      where: { leadOwner: { not: null } } // ✅ FIX
    });

    /* ---------------- LEAD STATUSES ---------------- */
    const statuses = await prisma.daleads.findMany({
      distinct: ["leadStatus"],
      select: { leadStatus: true },
      where: { leadStatus: { not: null } },
    });

    return {
      ok: true,

      // keep SAME response shape UI expects
      courses,
      sources: sources.map((s) => ({ source: s.leadOwner })), // ✅ UI still reads item.source
      statuses,
    };

  } catch (err) {
    console.error("❌ Filter Service Error:", err);
    return { ok: false, error: "Failed to load filters" };
  }
}
