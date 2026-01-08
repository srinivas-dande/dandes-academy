import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  buildEnrollmentConfirmedMail,
} from "@/lib/mail/sendLeadEmails";


/* ===============================
   Self-paced batch mapping
================================ */
function getSelfPacedBatchId(courseName) {
  const map = {
    "System Design Course": "SD-001",
    "DSA Course": "DSA-001",
    "Java Full Stack Development Course": "JAVA-001",
    "Spring Boot & Micro Services": "BMS-001",
    "Angular Course": "ANG-001",
    "React Course": "RCT-001",
    "AWS Course": "AWS-001",
    "Devops Course": "DEV-001",
  };
  return map[courseName?.trim()] || null;
}

/* ===============================
   COUNTER HELPERS (UNCHANGED)
================================ */
async function updateEnrollmentByOwner(tx, ownerName) {
  if (!ownerName) return;

  const row = await tx.enrollmentsByOwner.findFirst({
    where: { name: ownerName },
  });

  if (row) {
    await tx.enrollmentsByOwner.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await tx.enrollmentsByOwner.create({
      data: { name: ownerName, count: 1 },
    });
  }
}

async function updateEnrollmentByAdSource(tx, adSource) {
  if (!adSource) return;

  const row = await tx.enrollmentsByAdSource.findFirst({
    where: { name: adSource },
  });

  if (row) {
    await tx.enrollmentsByAdSource.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await tx.enrollmentsByAdSource.create({
      data: { name: adSource, count: 1 },
    });
  }
}

async function updateEnrollmentByCourse(courseName) {
  if (!courseName) return;

  const row = await prisma.enrollmentsByCourse.findFirst({
    where: { name: courseName },
  });

  if (row) {
    await prisma.enrollmentsByCourse.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.enrollmentsByCourse.create({
      data: { name: courseName, count: 1 },
    });
  }
}

async function updateEnrollmentBySource(sourceName) {
  if (!sourceName) return;

  const row = await prisma.enrollmentsBySource.findFirst({
    where: { name: sourceName },
  });

  if (row) {
    await prisma.enrollmentsBySource.update({
      where: { id: row.id },
      data: { count: { increment: 1 } },
    });
  } else {
    await prisma.enrollmentsBySource.create({
      data: { name: sourceName, count: 1 },
    });
  }
}

/* ===============================
   Enrollment number generator
================================ */
function generateEnrollmentNumber(lastEnrollmentNumber) {
  const year = new Date().getFullYear();
  let nextSeq = 15001;

  if (lastEnrollmentNumber) {
    const numericPart = Number(lastEnrollmentNumber.slice(4));
    if (!isNaN(numericPart)) nextSeq = numericPart + 1;
  }

  return `${year}${nextSeq}`;
}

/* ===============================
   POST API
================================ */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.leadCourseId) {
      return NextResponse.json(
        { ok: false, error: "leadCourseId is required" },
        { status: 400 }
      );
    }

    const leadId = body.leadId ? Number(body.leadId) : null;
    const fullName = body.name;
    const email = body.email || null;
    const phone = body.phone || null;
    const courseJoined = body.course || null;
    let batchId = body.batchId || null;

    if (!batchId || batchId === "Self-Paced") {
      batchId = getSelfPacedBatchId(courseJoined);
    }
    const isSelfPaced = !body.batchId || body.batchId === "Self-Paced";

    if (!batchId) {
      return NextResponse.json(
        { ok: false, error: "Invalid course selection" },
        { status: 400 }
      );
    }

    const totalFee = Number(body.totalFee || 0);
    const installmentsList = body.installmentsList || [];

    if (!fullName || !totalFee || installmentsList.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Invalid input data" },
        { status: 400 }
      );
    }

    let leadOwner = null;
    let adSource = null;
    let leadSource = null;

    if (leadId) {
      const lead = await prisma.daleads.findUnique({
        where: { leadId },
        select: {
          leadOwner: true,
          adSource: true,
          leadSource: true,
        },
      });

      leadOwner = lead?.leadOwner || null;
      adSource = lead?.adSource || null;
      leadSource = lead?.lead_Source || null;
    }

    /* ===============================
       STUDENT ID GENERATION (UNCHANGED)
    ================================ */
    const selfPacedPrefix = batchId.split("-")[0];
    const lastStudent = await prisma.daStudents_Course.findFirst({
      where: {
        studentId: {
          startsWith: isSelfPaced ? `${selfPacedPrefix}-` : `${batchId}-`,
        },
      },
      orderBy: { studentId: "desc" },
      select: { studentId: true },
    });

    let nextNo = 1;
    if (lastStudent?.studentId) {
      const parts = lastStudent.studentId.split("-");
      nextNo = Number(parts[parts.length - 1]) + 1;
    }

    const nextStudentId = isSelfPaced
      ? `${selfPacedPrefix}-${String(nextNo).padStart(3, "0")}`
      : `${batchId}-${String(nextNo).padStart(3, "0")}`;

    /* ===============================
   🔹 CHECK EXISTING STUDENT (PRIMARY KEY LOGIC)
    ================================ */

    let enrollmentNumber = null;
    let isExistingStudent = false;

    // 1️⃣ BEST CHECK: by leadId (most reliable in your CRM)
    if (leadId) {
      const studentByLead = await prisma.dastudents.findFirst({
        where: { leadId },
        select: { enrollmentNumber: true },
      });

      if (studentByLead) {
        enrollmentNumber = studentByLead.enrollmentNumber;
        isExistingStudent = true;
      }
    }

    


    // 2️⃣ FALLBACK: by phone/email (optional safety)
    if (!enrollmentNumber) {
      const studentByContact = await prisma.dastudents.findFirst({
        where: {
          OR: [
            phone ? { phone } : undefined,
            email ? { email } : undefined,
          ].filter(Boolean),
        },
        select: { enrollmentNumber: true },
      });

      if (studentByContact) {
        enrollmentNumber = studentByContact.enrollmentNumber;
        isExistingStudent = true;
      }
    }


    /* ===============================
       ENROLLMENT NUMBER (UNCHANGED LOGIC)
    ================================ */
    if (!enrollmentNumber) {
      const lastEnrollment = await prisma.dastudents.findFirst({
        orderBy: { enrollmentNumber: "desc" },
        select: { enrollmentNumber: true },
      });

      enrollmentNumber = generateEnrollmentNumber(
        lastEnrollment?.enrollmentNumber
      );
    }

    // 🚫 BLOCK duplicate enrollment for same course
    const alreadyEnrolled = await prisma.daStudents_Course.findFirst({
     where: {
       courseJoined,
        student: {
          enrollmentNumber,
        },
      },
    });

    if (alreadyEnrolled) {
      return NextResponse.json(
        { ok: false, error: "Student already enrolled in this course" },
        { status: 400 }
      );
    }

    /* ===============================
       ARRAY TRANSACTION (SAFE)
    ================================ */
    await prisma.$transaction(async (tx) => {
      // 1️⃣ Create student ONLY if new
      if (!isExistingStudent) {
        await tx.dastudents.create({
          data: {
            enrollmentNumber,
            leadId,
            fullName,
            email,
            phone,
            status: "active",
            leadOwner,
          },
        });
      }

      // 2️⃣ Create course and STORE IT
      const courseRow = await tx.daStudents_Course.create({
        data: {
          studentId: nextStudentId,
          courseJoined,
          totalFee,
          feePaid: 0,
          feeBalance: totalFee,
          installments: installmentsList.length,
          student: {
            connect: { enrollmentNumber },
          },
        },
      });

      // 3️⃣ Create installments linked to courseRow.id (BULK INSERT)
      await tx.feeInstallments.createMany({
        data: installmentsList.map((it) => ({
          installmentNo: it.installmentNo,
          amount: Number(it.amount),
          dueDate: new Date(it.dueDate),
          status: "Unpaid",
          courseId: courseRow.id,
        })),
      });


      // 4️⃣ Lead updates
      if (leadId) {
        await tx.daleads.update({
          where: { leadId },
          data: { leadStatus: "Enrolled" },
        });
      }
    });


    // 🔹 Update lead-course enrollment status (OUTSIDE transaction)
    if (leadId) {
      await prisma.daleadsCourse.update({
        where: {
          id: Number(body.leadCourseId),
        },
        data: {
          courseInterested: courseJoined,
          enrollmentStatus: "Enrolled",
        },
      });
    }



    // 📧 Enrollment Confirmation Mail (Template – Enrollment)
    if (email) {
      const enrollmentMail = buildEnrollmentConfirmedMail({
        fullName,
        enrollmentNumber,
        email,
        phone,
        course: courseJoined,
        studentId: nextStudentId,
        totalFee,
        installmentCount: installmentsList.length,
      });

      await prisma.$executeRaw`SELECT 1`; // keeps async flow stable

      // send mail
      await (await import("@/lib/mail/transporter.js")).transporter.sendMail({
        from: '"Dandes Academy" <hello@dandesacademy.com>',
        ...enrollmentMail,
      });
    }



    /* ===============================
       COUNTERS (UNCHANGED)
    ================================ */
    if (leadOwner) await updateEnrollmentByOwner(prisma, leadOwner);
    if (adSource) await updateEnrollmentByAdSource(prisma, adSource);

    await updateEnrollmentByCourse(courseJoined);
    await updateEnrollmentBySource(leadSource);

    return NextResponse.json({
      ok: true,
      data: {
        enrollmentNumber,
        studentId: nextStudentId,
      },
    });
  } catch (err) {
    console.error("POST /enrollment-api/enrollment-form error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}
