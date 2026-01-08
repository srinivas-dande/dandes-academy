import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { sendSalesAddedLeadEmails } from "@/lib/mail/sendLeadEmails";


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
   ADD / UPDATE LEAD WITH MULTIPLE COURSES
-----------------------------------------------------------*/
export async function addLeadHandler(payload = {}) {
  try {
    const session = await getSession();
    const leadOwner = session?.fullName || "Srinivas";

    const {
      fullName,
      email,
      phone,
      courseInterested,
      remarks,
    } = payload || {};

    if (!fullName || !email) {
      return { ok: false, error: "Full name and email are required." };
    }

    const selectedCourse = courseInterested || "AI/ML Course";
    const normalizedEmail = String(email).trim();
    const normalizedPhone = phone ? String(phone).trim() : null;

    /* --------------------------------------------------
       1️⃣ CHECK EXISTING LEAD
    -------------------------------------------------- */
    const existingLead = await prisma.daleads.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          normalizedPhone ? { phone: normalizedPhone } : undefined,
        ].filter(Boolean),
      },
      include: {
        courses: true,
      },
    });

    /* --------------------------------------------------
       2️⃣ IF LEAD EXISTS → ADD NEW COURSE
    -------------------------------------------------- */
    if (existingLead) {
      const alreadyHasCourse = existingLead.courses.some(
        (c) => c.courseInterested === selectedCourse
      );

      if (alreadyHasCourse) {
        return {
          ok: false,
          error: "Lead already exists for this course.",
          code: "COURSE_EXISTS",
        };
      }

      await prisma.daleadsCourse.create({
        data: {
          leadId: existingLead.leadId,
          courseInterested: selectedCourse,
          remarks: remarks || "NA",
        },
      });

      // 🔔 SEND EMAIL → Existing lead added with new course
      sendSalesAddedLeadEmails({
        fullName: existingLead.fullName,
        email: existingLead.email,
        phone: existingLead.phone,
        course: selectedCourse,
        source: "By Employee",
        leadOwner:leadOwner
      }).catch(() => {});


      return {
        ok: true,
        id: existingLead.leadId,
        message: "New course added to existing lead.",
      };
    }

    /* --------------------------------------------------
       3️⃣ IF NEW LEAD → CREATE LEAD + COURSE
    -------------------------------------------------- */
    const newLead = await prisma.daleads.create({
      data: {
        fullName: toTitleCase(fullName),
        email: normalizedEmail,
        phone: normalizedPhone,

        leadSource: "By Employee",
        adSource: "Phone Call",
        leadOwner: leadOwner,
        leadStatus: "New",

        courses: {
          create: {
            courseInterested: selectedCourse,
            remarks: remarks || "NA",
          },
        },
      },
    });

    // 🔔 SEND EMAIL → Template 3 & 4 (Lead Added by Sales Team)
    sendSalesAddedLeadEmails({
      fullName: toTitleCase(fullName),
      email: normalizedEmail,
      phone: normalizedPhone,
      course: selectedCourse,
      source: "By Employee",
      leadOwner:leadOwner
    }).catch(() => {});


    return {
      ok: true,
      id: newLead.leadId,
      message: "Lead added successfully!",
    };
  } catch (err) {
    console.error("addLeadHandler error:", err);

    return {
      ok: false,
      error: "Database error",
    };
  }
}
