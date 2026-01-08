import { NextResponse } from "next/server";
import { getLeadFilters } from "./service";

export async function GET() {
  const result = await getLeadFilters();

  return NextResponse.json(result, {
    status: result.ok ? 200 : 500
  });
}
