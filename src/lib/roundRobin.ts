import prisma from "@/lib/prisma";

export async function assignRoundRobinManager() {
  console.log("🔥 assignRoundRobinManager CALLED");

  const employees = await prisma.employees.findMany();
  console.log("👥 ALL EMPLOYEES:", employees);

  const managers = await prisma.employees.findMany({
    where: {
      role: "Manager",
    },
  });

  console.log("🎯 MANAGERS FOUND:", managers);

  if (!managers.length) {
    console.log("⚠️ NO MANAGERS → FALLBACK Srinivas");
    return "Srinivas";
  }

  return managers[0].fullName;
}
