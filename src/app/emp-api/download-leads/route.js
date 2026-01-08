import { NextResponse } from "next/server";
import { getFilteredLeads } from "./service";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const filters = {
    courseInterested: searchParams.get("courseInterested"),
    leadOwner: searchParams.get("leadOwner"),
    leadStatus: searchParams.get("leadStatus"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  };

  const result = await getFilteredLeads(filters);

  return NextResponse.json(result);
}
