import prisma from "@/lib/prisma";

export async function getLatestRunningWebinar() {
  try {
    const latest = await prisma.daWebinars.findFirst({
      where: { status: "Running" },
      orderBy: { createdAt: "desc" },
    });

    if (!latest) {
      return { ok: true, data: [] };
    }

    return { ok: true, data: [latest] };
  } catch (err) {
    console.error("❌ Webinar Service Error:", err);
    return { ok: false, error: "Database fetch failed" };
  }
}
