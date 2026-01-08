import { NextResponse } from "next/server";
import { getDashboardData } from "./dashboardService";

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Dashboard API error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}
