import prisma from "@/lib/prisma";

export async function addWebinarHandler(payload = {}) {
  const { title, dateTime, description } = payload || {};

  if (!title || !dateTime) {
    return { ok: false, error: "Title and dateTime (ISO) are required." };
  }

  const dt = new Date(dateTime);
  if (Number.isNaN(dt.getTime())) {
    return { ok: false, error: "Invalid dateTime format. Use ISO string." };
  }

  const data = {
    title: String(title).trim(),
    dateTime: dt,
    description: description ? String(description).trim() : null,
    status: "Running",
  };

  try {
    await prisma.daWebinars.updateMany({
      where: { status: "Running" },
      data: { status: "Closed" },
    });

    const created = await prisma.daWebinars.create({ data });

    console.log("✅ New webinar created:", created.webinarId);
    return { ok: true, data: created };
  } catch (err) {
    console.error("❌ addWebinarHandler error:", err);
    return { ok: false, error: "Database insertion failed." };
  }
}
