import prisma from "@/lib/prisma";

export async function assignRoundRobinManager() {
  console.log("🔥 assignRoundRobinManager CALLED");

  const managers = await prisma.employees.findMany({
    where: {
      designation: "Manager",
      status: "working",
      isactive: true,
    },
    orderBy: { empId: "asc" },
  });

  console.log("🎯 MANAGERS FOUND:", managers.map(m => m.fullName));

  // Safety fallback
  if (!managers.length) {
    return "Srinivas Dande";
  }

  let tracker = await prisma.roundRobinTracker.findFirst();

  if (!tracker) {
    tracker = await prisma.roundRobinTracker.create({
      data: { lastIndex: 0 },
    });
    return managers[0].fullName;
  }

  const nextIndex = (tracker.lastIndex + 1) % managers.length;

  await prisma.roundRobinTracker.update({
    where: { id: tracker.id },
    data: { lastIndex: nextIndex },
  });

  return managers[nextIndex].fullName;
}
