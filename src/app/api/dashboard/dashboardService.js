import prisma from "@/lib/prisma";

export async function getDashboardData() {
  const [
    leadsByOwner,
    leadsByAdSource,
    leadsByCourse,
    leadsBySource,
    enrollmentsByOwner,
    enrollmentsByAdSource,
    enrollmentsByCourse,
    enrollmentsBySource,
  ] = await Promise.all([
    prisma.leadsByOwner.findMany({ orderBy: { name: "asc" } }),
    prisma.leadsByAdSource.findMany({ orderBy: { name: "asc" } }),
    prisma.leadsByCourse.findMany({ orderBy: { name: "asc" } }),
    prisma.leadsBySource.findMany({ orderBy: { name: "asc" } }),

    prisma.enrollmentsByOwner.findMany({ orderBy: { name: "asc" } }),
    prisma.enrollmentsByAdSource.findMany({ orderBy: { name: "asc" } }),
    prisma.enrollmentsByCourse.findMany({ orderBy: { name: "asc" } }),
    prisma.enrollmentsBySource.findMany({ orderBy: { name: "asc" } }),
  ]);

  return {
    leadsByOwner,
    leadsByAdSource,
    leadsByCourse,
    leadsBySource,
    enrollmentsByOwner,
    enrollmentsByAdSource,
    enrollmentsByCourse,
    enrollmentsBySource,
  };
}
