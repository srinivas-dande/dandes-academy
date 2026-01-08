import prisma from "@/lib/prisma";

/* ----------------------------------------------------------
   Extract Next Follow-up from activity description ONLY
-----------------------------------------------------------*/
function extractNextFollowup(activities = []) {
  for (const act of activities) {
    if (!act.description) continue;

    const match = act.description.match(/Next Follow-up:\s*([^|]+)/i);
    if (match?.[1]) {
      return match[1].trim();
    }
  }
  return "Not set";
}

export async function GET(req, context) {
  try {
    // ✅ Next.js 16 requires await
    const { id } = await context.params;
    const leadId = Number(id);

    if (isNaN(leadId)) {
      return Response.json(
        { ok: false, error: "Invalid lead ID" },
        { status: 400 }
      );
    }

    const lead = await prisma.daleads.findUnique({
      where: { leadId: leadId },
      include: {
        tags: {
          select: { id: true, tag: true },
        },
        activities: {
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            activityType: true,
            title: true,
            description: true,
            createdAt: true,
            leadOwner: true,
          },
        },
        courses: {
          select: {
            id: true,
            courseInterested: true,
            enrollmentStatus: true,
          },
        },
      },
    });

    if (!lead) {
      return Response.json(
        { ok: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    // ✅ DERIVED ONLY FROM description
    const nextFollowup = extractNextFollowup(lead.activities);

    return Response.json({
      ok: true,
      data: {
        ...lead,
        nextFollowup,
      },
    });
  } catch (err) {
    console.error("GET /emp-api/leads/[id] error:", err);
    return Response.json(
      { ok: false, error: "Server error fetching lead" },
      { status: 500 }
    );
  }
}
