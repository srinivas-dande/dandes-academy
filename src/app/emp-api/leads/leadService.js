import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function getAllLeadsHandler(params = {}) {
  const {
    q = "",
    take = 10,
    skip = 0,
    sortKey = "createdAt",
    sortDir = "desc",
  } = params;

  try {
    // ✅ GET LOGGED-IN USER
    const session = await getSession();
    const role = session?.role;
    const managerName = session?.fullName;

    // ✅ BASE WHERE (DO NOT EXCLUDE ANY LEADS)
    const where = {};

    // ✅ ONLY LOGIN MANAGER LEADS (ADMIN SEES ALL)
    if (role !== "admin") {
      where.leadOwner = managerName;
    }

    // ✅ SEARCH
    if (q.trim()) {
      where.OR = [
        { fullName: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
        { leadOwner: { contains: q, mode: "insensitive" } },
        { leadStatus: { contains: q, mode: "insensitive" } },
        {
          phone: {
            not: null,
            contains: q,
          },
        },
        {
          courses: {
            some: {
              courseInterested: { contains: q, mode: "insensitive" },
            },
          },
        },
        {
          courses: {
            some: {
              remarks: { contains: q, mode: "insensitive" },
            },
          },
        },
      ];
    }

    // ✅ SORTING
    const allowedSortKeys = [
      "createdAt",
      "fullName",
      "email",
      "leadStatus",
      "leadOwner",
    ];

    const orderBy =
      sortKey === "source"
        ? { leadOwner: sortDir }
        : allowedSortKeys.includes(sortKey)
        ? { [sortKey]: sortDir }
        : { createdAt: "desc" };

    // ✅ FETCH LEADS (ALL)
    const [leads, total] = await Promise.all([
      prisma.daleads.findMany({
        where,
        orderBy,
        skip: Number(skip),
        take: Number(take),
        include: {
          courses: {
            select: {
              courseInterested: true,
              enrollmentStatus: true,
              remarks: true,
              updatedAt: true,
            },
          },
        },
      }),
      prisma.daleads.count({ where }),
    ]);

    return {
      ok: true,
      data: leads,
      total,
    };
  } catch (error) {
    console.error("❌ getAllLeadsHandler FULL ERROR:", error);
    return {
      ok: false,
      error: error.code || error.name || "Database query failed",
      details: error.message,
    };
  }
}
