import prisma from "@/lib/prisma";
import {
  sendLeadEmails,
  sendLeadResubmittedEmails,
} from "@/lib/mail/sendLeadEmails";

/* ----------------------------------------------------------
   UTM SOURCE → DB NAME MAPPING
-----------------------------------------------------------*/
const adSourceMap = {
  direct: "Direct",
  my_lms: "My LMS",
  phone_call: "Phone Call",
  my_whatsapp: "My Whats App",
  my_social_media: "My Social Media",
  facebook_ad: "Facebook Ad",
  instagram_ad: "Instagram Ad",
  youtube_ad: "Youtube Ad",
  google_ad: "Google Ad",
  linkedin_ad: "LinkedIn Ad",
};

/* ----------------------------------------------------------
   Convert name → Title Case
-----------------------------------------------------------*/
function toTitleCase(str = "") {
  return str
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/* ----------------------------------------------------------
   ROUND ROBIN MANAGER ASSIGNMENT
-----------------------------------------------------------*/
async function assignRoundRobinManager() {
  try {
    const managers = await prisma.employees.findMany({
      where: { designation: "Manager", isactive: true },
      select: { fullName: true },
    });

    if (!managers.length) return "Website";

    let counter = await prisma.roundRobinCounter.findUnique({
      where: { id: 1 },
    });

    if (!counter) {
      counter = await prisma.roundRobinCounter.create({
        data: { id: 1, index: 0 },
      });
    }

    const selected = managers[counter.index % managers.length].fullName;

    await prisma.roundRobinCounter.update({
      where: { id: 1 },
      data: { index: { increment: 1 } },
    });

    return selected;
  } catch (e) {
    console.error("Round robin error:", e);
    return "Website";
  }
}

/* ----------------------------------------------------------
   HANDLE ADD LEAD (LEAD CAPTURE)
-----------------------------------------------------------*/
export async function handleAddLeadCapture(payload = {}) {
  let formattedName, finalCourse, finalSource;

  try {
    const {
      full_Name,
      email,
      phone,
      course,
      course_Interested,
      lead_source,
      lead_ad_source,
      Remarks,
    } = payload || {};

    if (!full_Name || !email) {
      return { ok: false, error: "Missing required fields." };
    }

    formattedName = toTitleCase(full_Name);
    finalCourse = course_Interested || course || "AI/ML Course";
    finalSource = lead_source || "Website";

    let leadOwner = "Website";
    if (finalSource === "Website") {
      leadOwner = await assignRoundRobinManager();
    }

    const normalizedSource = (lead_ad_source || "direct").toLowerCase();
    const finalAdSource = adSourceMap[normalizedSource] || "Direct";

    const newLead = await prisma.daleads.create({
      data: {
        fullName: formattedName,
        email: String(email).trim(),
        phone: phone ? String(phone).trim() : null,
        leadSource: finalSource,
        leadOwner,
        adSource: finalAdSource,
        leadStatus: "New",
        courses: {
          create: {
            courseInterested: finalCourse,
            remarks: Remarks || "NA",
          },
        },
      },
    });

    await updateLeadByOwner(leadOwner);
    await updateLeadByAdSource(finalAdSource);
    await updateLeadBySource(finalSource);
    await updateLeadByCourse(finalCourse);

    sendLeadEmails({
      fullName: formattedName,
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : null,
      course: finalCourse,
      source: finalSource,
    }).catch(() => {});

    return { ok: true, id: newLead.leadId };
  } catch (err) {
    if (err?.code === "P2002") {
      sendLeadResubmittedEmails({
        fullName: formattedName,
        email: payload?.email ? String(payload.email).trim() : null,
        phone: payload?.phone ? String(payload.phone).trim() : null,
        course: finalCourse,
        source: finalSource,
      }).catch(() => {});

      return {
        ok: false,
        error: "Your Details Already exists. Our team will contact You Shortly.",
        code: "DUPLICATE_LEAD",
      };
    }

    console.error("Add lead capture error:", err);

    return { ok: false, error: "Database error." };
  }
}

/* ----------------------------------------------------------
   COUNTERS (UNCHANGED)
-----------------------------------------------------------*/
async function updateLeadByOwner(name) {
  if (!name) return;

  const row = await prisma.leadsByOwner.findFirst({ where: { name } });

  if (row) {
    await prisma.leadsByOwner.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.leadsByOwner.create({
      data: { name, count: 1 },
    });
  }
}

async function updateLeadByAdSource(source) {
  if (!source) return;

  const row = await prisma.leadsByAdSource.findFirst({
    where: { name: source },
  });

  if (row) {
    await prisma.leadsByAdSource.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.leadsByAdSource.create({
      data: { name: source, count: 1 },
    });
  }
}

async function updateLeadBySource(source) {
  if (!source) return;

  const row = await prisma.leadsBySource.findFirst({
    where: { name: source },
  });

  if (row) {
    await prisma.leadsBySource.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.leadsBySource.create({
      data: { name: source, count: 1 },
    });
  }
}

async function updateLeadByCourse(courseName) {
  if (!courseName) return;

  const row = await prisma.leadsByCourse.findFirst({
    where: { name: courseName },
  });

  if (row) {
    await prisma.leadsByCourse.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.leadsByCourse.create({
      data: { name: courseName, count: 1 },
    });
  }
}
