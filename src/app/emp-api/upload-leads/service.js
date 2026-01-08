import prisma from "@/lib/prisma";
import { sendLeadEmails } from "@/lib/mail/sendLeadEmails";

/* ---------------------------------------------
   CSV PARSER
--------------------------------------------- */
export function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(",");
    const row = {};

    headers.forEach((header, idx) => {
      row[header] = cells[idx]?.trim() || "";
    });

    rows.push(row);
  }

  return rows;
}

/* ---------------------------------------------
   VALIDATION
--------------------------------------------- */
export function validateRow(row) {
  if (!row.full_Name || !row.email || !row.phone) {
    return "Missing required fields: full_Name, email, phone";
  }
  return null;
}

/* ---------------------------------------------
   CHECK DUPLICATE
--------------------------------------------- */
export async function checkDuplicate(row) {
  return await prisma.daleads.findFirst({
    where: {
      OR: [{ email: row.email }, { phone: row.phone }],
    },
  });
}

/* ---------------------------------------------
   ROUND ROBIN MANAGER (SAME LOGIC AS WEBSITE)
--------------------------------------------- */
async function assignRoundRobinManager() {
  const managers = await prisma.employees.findMany({
    where: {
      designation: "Manager",
      isactive: true,
    },
    select: {
      fullName: true,
    },
  });

  if (!managers.length) return "Upload CSV";

  let counter = await prisma.roundRobinCounter.findUnique({
    where: { id: 1 },
  });

  if (!counter) {
    counter = await prisma.roundRobinCounter.create({
      data: { id: 1, index: 0 },
    });
  }

  const manager = managers[counter.index % managers.length].fullName;

  await prisma.roundRobinCounter.update({
    where: { id: 1 },
    data: { index: { increment: 1 } },
  });

  return manager;
}

/* ---------------------------------------------
   INSERT LEAD INTO DB (UPDATED)
--------------------------------------------- */
export async function insertLead(row, managerName) {
  const selectedCourse = row.course_Interested || "AI/ML Course";

  return await prisma.daleads.create({
    data: {
      fullName: row.full_Name,
      email: row.email,
      phone: row.phone,

      leadOwner: managerName,
      leadSource: "By Employee",
      adSource: "Phone Call",
      leadStatus: "New",

      courses: {
        create: {
          courseInterested: selectedCourse,
          remarks: row.Remarks || "NA",
        },
      },
    },
  });
}


/* ---------------------------------------------
   PROCESS CSV + SEND MAIL
--------------------------------------------- */
export async function processCSV(csvText) {
  const rows = parseCSV(csvText);

  let successCount = 0;
  const errors = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // 1️⃣ Validate row
    const validationError = validateRow(row);
    if (validationError) {
      errors.push({ row: i + 2, reason: validationError });
      continue;
    }

    // 2️⃣ Check duplicate
    const exists = await checkDuplicate(row);
    if (exists) {
      errors.push({
        row: i + 2,
        reason: "Duplicate lead",
        duplicateField: exists.email === row.email ? "email" : "phone",
        value: exists.email === row.email ? row.email : row.phone,
      });
      continue;
    }

    // 3️⃣ Assign manager via round robin
    const managerName = await assignRoundRobinManager();

    // 4️⃣ Insert lead
    const newLead = await insertLead(row, managerName);
    successCount++;

    // 5️⃣ Send email
    try {
      await sendLeadEmails({
        fullName: row.full_Name,
        email: row.email,
        phone: row.phone,
        course: row.course_Interested,
        source: managerName,
      });
    } catch (err) {
      console.error("❌ Email failed:", err.message);
      errors.push({
        row: i + 2,
        reason: "Lead saved but email sending failed",
      });
    }
  }

  return { successCount, errors };
}
