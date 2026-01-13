import prisma from "@/lib/prisma";

export async function assignRoundRobinManager() {
  try {
    const managers = await prisma.Employees.findMany({
      where: {
        designation: "Manager",
        isactive: true,
      },
      select: { fullName: true },
    });

    if (!managers.length) return "Srinivas";

    let counter = await prisma.roundRobinCounter.findUnique({
      where: { id: 1 },
    });

    if (!counter) {
      counter = await prisma.roundRobinCounter.create({
        data: { id: 1, index: 0 },
      });
    }

    const selected =
      managers[counter.index % managers.length].fullName;

    await prisma.roundRobinCounter.update({
      where: { id: 1 },
      data: { index: { increment: 1 } },
    });

    return selected;
  } catch (e) {
    console.error("Round robin error:", e);
    return "Srinivas";
  }
}
