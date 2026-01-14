import prisma from "@/lib/prisma";


export async function assignRoundRobinManager() {
  // 1️⃣ Get all ACTIVE managers
  const managers = await prisma.employees.findMany({
    where: {
      role: "Manager",
      isActive: true,
      status: "working",
    },
    orderBy: { id: "asc" },
  });

  // Fallback (safety)
  if (!managers.length) {
    return "Srinivas Dande";
  }

  // 2️⃣ Get last assigned index
  let tracker = await prisma.roundRobinTracker.findFirst();

  // If tracker not exists → create it
  if (!tracker) {
    tracker = await prisma.roundRobinTracker.create({
      data: { lastIndex: 0 },
    });

    return managers[0].fullName;
  }

  // 3️⃣ Calculate next index
  const nextIndex = (tracker.lastIndex + 1) % managers.length;

  // 4️⃣ Update tracker
  await prisma.roundRobinTracker.update({
    where: { id: tracker.id },
    data: { lastIndex: nextIndex },
  });

  // 5️⃣ Return next manager
  return managers[nextIndex].fullName;
}
